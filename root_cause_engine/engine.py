from knowledge_base import DEFECT_KB

def adjust_conf(base, model_conf):
    return round(base * model_conf * 100, 2)

def generate_output(prediction):
    defect = prediction["predicted_defect"]
    model_conf = prediction["confidence"]

    if defect not in DEFECT_KB:
        return {"error": "Unknown defect"}

    data = DEFECT_KB[defect]

    primary = {
        "cause": data["primary"][0],
        "confidence": adjust_conf(data["primary"][1], model_conf)
    }

    secondary = [
        {
            "cause": c[0],
            "confidence": adjust_conf(c[1], model_conf)
        }
        for c in data["secondary"]
    ]

    # Add smart warning
    warning = None
    if model_conf < 0.6:
        warning = "⚠️ Low model confidence. Manual verification recommended."

    return {
        "defect": defect,
        "primary": primary,
        "secondary": secondary,
        "actions": data["actions"],
        "severity": data["severity"],
        "reason": data["reason"],
        "warning": warning
    }