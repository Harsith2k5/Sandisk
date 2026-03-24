
import kagglehub

path = kagglehub.dataset_download("qingyi/wm811k-wafer-map")

print("Path to dataset files:", path)

# ================================
#  MULTIPLE SAMPLE TESTING
# ================================

import os
import numpy as np
import pandas as pd
import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
import matplotlib.pyplot as plt

# ================================
#  CONFIG
# ================================
DATA_PATH = "/root/.cache/kagglehub/datasets/qingyi/wm811k-wafer-map/versions/1"
MODEL_PATH = "wafer_model_optimized.pth"
IMG_SIZE = 224
NUM_TESTS = 6  

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# ================================
#  LOAD DATA
# ================================
df = pd.read_pickle(os.path.join(DATA_PATH, "LSWMD.pkl"))

def extract_label(x):
    if isinstance(x, (list, np.ndarray)) and len(x) > 0:
        val = x[0]
        if isinstance(val, (list, np.ndarray)):
            return str(val[0])
        return str(val)
    return None

df['label'] = df['failureType'].apply(extract_label)
df = df[df['label'].notnull()]
df = df[df['label'] != 'none']

labels = sorted(df['label'].unique())
label_to_idx = {label: i for i, label in enumerate(labels)}
idx_to_label = {i: label for label, i in label_to_idx.items()}

print("Classes:", labels)

# ================================
#  LOAD MODEL
# ================================
model = models.resnet18(weights=models.ResNet18_Weights.DEFAULT)
model.fc = nn.Linear(model.fc.in_features, len(labels))

model.load_state_dict(torch.load(MODEL_PATH, map_location=device))
model = model.to(device)
model.eval()

print(" Model loaded")

# ================================
#  TRANSFORM
# ================================
transform = transforms.Compose([
    transforms.Resize((IMG_SIZE, IMG_SIZE)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

# ================================
#  MULTI TEST LOOP
# ================================
correct = 0

for i in range(NUM_TESTS):

    sample = df.sample(1).iloc[0]

    wafer_map = np.array(sample['waferMap'])
    true_label = sample['label']

    # Normalize
    wafer_map_norm = (wafer_map - wafer_map.min()) / (wafer_map.max() - wafer_map.min() + 1e-8)
    wafer_map_norm = (wafer_map_norm * 255).astype(np.uint8)

    img = Image.fromarray(wafer_map_norm).convert("RGB")
    input_tensor = transform(img).unsqueeze(0).to(device)

    # Prediction
    with torch.no_grad():
        outputs = model(input_tensor)
        probs = torch.softmax(outputs, dim=1).cpu().numpy()[0]

    top3_idx = probs.argsort()[-3:][::-1]
    pred_label = idx_to_label[top3_idx[0]]
    confidence = probs[top3_idx[0]] * 100

    # Accuracy tracking
    if pred_label == true_label:
        correct += 1

    # ================================
    #  PRINT RESULTS
    # ================================
    print(f"\n Test {i+1}")
    print(f"True Label: {true_label}")
    print(f"Predicted: {pred_label} ({confidence:.2f}%)")

    print("Top-3 Predictions:")
    for j in top3_idx:
        print(f"  {idx_to_label[j]} → {probs[j]*100:.2f}%")

    # ================================
    #  SHOW IMAGE
    # ================================
    plt.figure(figsize=(3,3))
    plt.imshow(wafer_map_norm, cmap='gray')
    plt.title(f"True: {true_label}\nPred: {pred_label}")
    plt.axis('off')
    plt.show()

# ================================
# 🏁 FINAL ACCURACY
# ================================
print("\n===============================")
print(f" Accuracy on {NUM_TESTS} samples: {(correct/NUM_TESTS)*100:.2f}%")
print("===============================")
