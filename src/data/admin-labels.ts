import { CourseCategory, CourseStatus, InquiryStatus, TrainingCardOwnership } from "@prisma/client";

export const inquiryStatusLabels: Record<InquiryStatus, string> = {
  NEW: "신규",
  CHECKING: "확인중",
  COUNSELING_DONE: "상담완료",
  ENROLLED: "신청완료",
  HOLD: "보류",
};

export const trainingCardOwnershipLabels: Record<TrainingCardOwnership, string> = {
  YES: "예",
  NO: "아니오",
  UNKNOWN: "잘 모르겠음",
};

export const courseCategoryLabels: Record<CourseCategory, string> = {
  GENERAL: "일반과정",
  TRAINING_CARD: "국민내일배움카드과정",
};

export const courseStatusLabels: Record<CourseStatus, string> = {
  RECRUITING: "모집중",
  SCHEDULED: "예정",
  CLOSED: "마감",
};
