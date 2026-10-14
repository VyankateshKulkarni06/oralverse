export type CaseReviewStatus = 'ready' | 'in_review' | 'reviewed' | 'retake_recommended';
export type QualityStatus = 'pass' | 'borderline' | 'retake';
export type ImageViewType = 'frontal' | 'upper_occlusal' | 'lower_occlusal' | 'lateral_buccal_right' | 'lateral_buccal_left';

export interface AnnotationROI {
  id: string;
  toothNumber?: string;
  label: string;
  category: 'Area for Clinician Review' | 'Enamel Surface Feature' | 'Marginal Gingiva' | 'Restorative Margin' | 'Image Quality Limitation';
  confidenceText: string; // e.g. "Simulated review marker (Demo)"
  description: string;
  recommendation: string;
  // Bounding box in percentage [0..100]
  x: number;
  y: number;
  width: number;
  height: number;
  svgPath?: string;
  severity: 'info' | 'caution' | 'priority';
}

export interface ToothSegment {
  fdiNumber: string;
  universalNumber: string;
  name: string;
  quadrant: 'UR' | 'UL' | 'LL' | 'LR';
  x: number; // percentage center
  y: number; // percentage center
  status: 'normal' | 'review_indicated' | 'restoration_present' | 'occlusal_wear';
  notes?: string;
}

export interface CaseImage {
  id: string;
  caseId: string;
  viewType: ImageViewType;
  viewLabel: string;
  url: string;
  capturedAt: string;
  resolution: string;
  quality: QualityStatus;
  qualityScore: number; // 0 - 100
  qualityIndicators: {
    focusSharpness: 'optimal' | 'acceptable' | 'blurry';
    lightingExposure: 'optimal' | 'adequate' | 'overexposed' | 'underexposed';
    fieldCoverage: 'complete' | 'partial' | 'obstructed';
    salivaContamination: 'low' | 'moderate' | 'excessive';
  };
  annotations: AnnotationROI[];
  toothSegments: ToothSegment[];
}

export interface CaseItem {
  id: string; // e.g. "OV-DEMO-1042"
  patientReference: string; // Fictional code, e.g. "ANON-4821"
  patientAgeGroup: string; // "Adult 35-44"
  dateAdded: string;
  clinician: string;
  reviewStatus: CaseReviewStatus;
  overallQuality: QualityStatus;
  imageCount: number;
  thumbnail: string;
  clinicalNotes: string;
  visualFindingsSummary: string;
  tags: string[];
  images: CaseImage[];
  reviewedAt?: string;
  reviewedBy?: string;
}

export interface KPIMetrics {
  casesReviewed: number;
  casesReviewedTrend: string;
  imagesAnalyzed: number;
  imagesAnalyzedTrend: string;
  casesAwaitingReview: number;
  casesAwaitingReviewTrend: string;
  qualityPassRate: number;
  qualityPassRateTrend: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'case' | 'quality' | 'system';
}

export interface UserPreferences {
  clinicianName: string;
  clinicianTitle: string;
  clinicName: string;
  notationSystem: 'FDI' | 'Universal';
  highContrastOverlays: boolean;
  defaultAnnotationOpacity: number;
  autoEnhanceView: boolean;
  emailAlerts: boolean;
  soundFeedback: boolean;
}
