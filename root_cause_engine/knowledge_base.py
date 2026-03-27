DEFECT_KB = {
    "EDGE_RING": {
        "primary": ("Non-uniform chemical distribution", 0.85),
        "secondary": [
            ("Spin coater imbalance", 0.65),
            ("Edge bead removal issue", 0.55)
        ],
        "actions": [
            "Check chemical flow uniformity",
            "Recalibrate spin speed",
            "Inspect edge bead removal system"
        ],
        "severity": "High",
        "reason": "Edge defects usually occur due to uneven spreading during spin coating."
    },

    "CENTER": {
        "primary": ("Localized contamination", 0.80),
        "secondary": [
            ("Nozzle misalignment", 0.60),
            ("Particle deposition", 0.50)
        ],
        "actions": [
            "Clean nozzle",
            "Check contamination control protocols",
            "Inspect deposition alignment"
        ],
        "severity": "Medium",
        "reason": "Center defects suggest localized contamination or misaligned deposition."
    },

    "DONUT": {
        "primary": ("Radial flow instability", 0.82),
        "secondary": [
            ("Improper spin acceleration", 0.68),
            ("Viscosity variation in resist", 0.60)
        ],
        "actions": [
            "Optimize spin acceleration profile",
            "Check resist viscosity consistency",
            "Ensure uniform dispense volume"
        ],
        "severity": "High",
        "reason": "Donut patterns arise from unstable radial flow during spin coating."
    },

    "EDGE_LOC": {
        "primary": ("Localized edge contamination", 0.78),
        "secondary": [
            ("Partial edge bead removal failure", 0.65),
            ("Airflow disturbance near wafer edge", 0.55)
        ],
        "actions": [
            "Inspect edge bead removal nozzle",
            "Check airflow conditions in chamber",
            "Clean wafer edges before processing"
        ],
        "severity": "Medium",
        "reason": "Edge-local defects are confined to specific edge regions due to localized issues."
    },

    "LOC": {
        "primary": ("Particle contamination", 0.88),
        "secondary": [
            ("Dust or airborne particles", 0.70),
            ("Surface preparation issue", 0.60)
        ],
        "actions": [
            "Improve cleanroom conditions",
            "Inspect wafer surface before coating",
            "Use particle filtration systems"
        ],
        "severity": "Medium",
        "reason": "Localized defects typically indicate particle contamination."
    },

    "NEAR_FULL": {
        "primary": ("Global process failure", 0.90),
        "secondary": [
            ("Chemical degradation", 0.75),
            ("Incorrect process parameters", 0.70)
        ],
        "actions": [
            "Verify chemical integrity",
            "Recheck process parameters",
            "Run calibration wafers"
        ],
        "severity": "Critical",
        "reason": "Near-full defects indicate widespread process failure affecting most of the wafer."
    },

    "RANDOM": {
        "primary": ("Uncontrolled contamination", 0.75),
        "secondary": [
            ("Environmental instability", 0.65),
            ("Irregular equipment behavior", 0.55)
        ],
        "actions": [
            "Stabilize environment conditions",
            "Check equipment consistency",
            "Monitor random particle sources"
        ],
        "severity": "Low",
        "reason": "Random defects are scattered and often caused by unpredictable contamination."
    },

    "SCRATCH": {
        "primary": ("Mechanical damage", 0.92),
        "secondary": [
            ("Wafer handling issue", 0.80),
            ("Contact with hard surface", 0.70)
        ],
        "actions": [
            "Inspect wafer handling mechanisms",
            "Ensure proper robotic arm calibration",
            "Avoid physical contact during transfer"
        ],
        "severity": "High",
        "reason": "Scratches are caused by physical contact or mishandling of wafers."
    }
}