export interface WaferData {
  id: string;
  filename: string;
  uploadDate: Date;
  status: 'analyzing' | 'complete' | 'failed';
}

export interface Prediction {
  pattern: string;
  confidence: number;
  timestamp: Date;
}

export interface Alternative {
  cause: string;
  confidence: number;
}

export interface RootCause {
  primary: {
    cause: string;
    confidence: number;
  };
  alternatives: Alternative[];
}

export interface YieldData {
  failedDies: number;
  totalDies: number;
  revenueLoss: number;
}

export interface FMEAData {
  severity: number;
  occurrence: number;
  detection: number;
  rpn: number;
  recommendedAction: string;
}

export interface BatchTrend {
  waferId: string;
  timestamp: Date;
  defectRate: number;
  isAnomaly: boolean;
}
