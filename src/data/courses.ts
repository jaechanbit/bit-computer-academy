export type CourseCategory = "GENERAL" | "TRAINING_CARD";
export type CourseStatus = "RECRUITING" | "SCHEDULED" | "CLOSED";

export type Course = {
  title: string;
  slug: string;
  category: CourseCategory;
  summary: string;
  description: string;
  target: string;
  curriculum: string[];
  outcome: string;
  duration: string;
  schedule: string;
  price: string;
  capacity: string;
  status: CourseStatus;
  supportsTrainingCard: boolean;
};

export const categoryLabels: Record<CourseCategory, string> = {
  GENERAL: "일반과정",
  TRAINING_CARD: "국민내일배움카드과정",
};

export const statusLabels: Record<CourseStatus, string> = {
  RECRUITING: "모집중",
  SCHEDULED: "예정",
  CLOSED: "마감",
};

export const courses: Course[] = [
  {
    title: "ITQ",
    slug: "itq",
    category: "GENERAL",
    summary: "한글, 엑셀, 파워포인트 등 ITQ 자격 취득을 준비하는 과정입니다.",
    description: "문서 작성과 사무 실무에 필요한 기본 기능을 익히고 ITQ 자격 시험 기준에 맞춰 반복 실습합니다.",
    target: "컴퓨터 기초부터 자격증 취득까지 차근차근 준비하고 싶은 수강생",
    curriculum: ["문서 작성 기본", "표와 차트 활용", "기출 유형 실습", "모의고사 풀이"],
    outcome: "사무 문서 작성 능력과 ITQ 자격 시험 대응력을 함께 높일 수 있습니다.",
    duration: "상담 후 안내",
    schedule: "상담 후 안내",
    price: "상담 후 안내",
    capacity: "상담 후 안내",
    status: "RECRUITING",
    supportsTrainingCard: false,
  },
  {
    title: "정보처리",
    slug: "information-processing",
    category: "GENERAL",
    summary: "정보처리 관련 기초 이론과 자격 대비 내용을 학습합니다.",
    description: "컴퓨터 시스템, 데이터베이스, 소프트웨어 기초 개념을 정리하고 시험 대비 학습을 진행합니다.",
    target: "정보처리 분야 입문자 또는 관련 자격증을 준비하는 수강생",
    curriculum: ["컴퓨터 일반", "데이터베이스 기초", "소프트웨어 기초", "문제 풀이"],
    outcome: "정보처리 분야의 기본 개념을 이해하고 자격 대비 기반을 만들 수 있습니다.",
    duration: "상담 후 안내",
    schedule: "상담 후 안내",
    price: "상담 후 안내",
    capacity: "상담 후 안내",
    status: "RECRUITING",
    supportsTrainingCard: false,
  },
  {
    title: "사무자동화",
    slug: "office-automation",
    category: "GENERAL",
    summary: "사무자동화 실무와 자격 대비를 함께 준비하는 과정입니다.",
    description: "업무 문서, 스프레드시트, 데이터 관리 등 사무 환경에서 필요한 자동화 활용 능력을 학습합니다.",
    target: "사무직 취업 준비생, 업무 효율을 높이고 싶은 재직자",
    curriculum: ["사무 문서 활용", "스프레드시트 실습", "데이터 정리", "실전 문제 풀이"],
    outcome: "반복 업무를 줄이고 사무 실무 처리 능력을 키울 수 있습니다.",
    duration: "상담 후 안내",
    schedule: "상담 후 안내",
    price: "상담 후 안내",
    capacity: "상담 후 안내",
    status: "RECRUITING",
    supportsTrainingCard: false,
  },
  {
    title: "포토샵",
    slug: "photoshop",
    category: "GENERAL",
    summary: "이미지 편집과 디자인 실무에 필요한 포토샵 기본기를 익힙니다.",
    description: "사진 보정, 합성, 배너 제작 등 실제 작업에 자주 쓰이는 포토샵 기능을 중심으로 실습합니다.",
    target: "디자인 입문자, 쇼핑몰 이미지 제작이 필요한 사용자",
    curriculum: ["포토샵 기본 도구", "이미지 보정", "레이어와 마스크", "실무 이미지 제작"],
    outcome: "간단한 이미지 편집부터 실무형 디자인 작업까지 직접 수행할 수 있습니다.",
    duration: "상담 후 안내",
    schedule: "상담 후 안내",
    price: "상담 후 안내",
    capacity: "상담 후 안내",
    status: "RECRUITING",
    supportsTrainingCard: false,
  },
  {
    title: "일러스트",
    slug: "illustrator",
    category: "GENERAL",
    summary: "로고, 아이콘, 인쇄물 제작에 필요한 일러스트 기능을 배웁니다.",
    description: "벡터 그래픽의 기본 원리를 이해하고 일러스트레이터를 활용한 디자인 실습을 진행합니다.",
    target: "그래픽 디자인 기초를 배우고 싶은 수강생",
    curriculum: ["벡터 그래픽 이해", "펜툴과 도형", "색상과 타이포그래피", "출력물 제작"],
    outcome: "로고, 안내물, 홍보물 등 기본 디자인 결과물을 만들 수 있습니다.",
    duration: "상담 후 안내",
    schedule: "상담 후 안내",
    price: "상담 후 안내",
    capacity: "상담 후 안내",
    status: "RECRUITING",
    supportsTrainingCard: false,
  },
  {
    title: "컴퓨터그래픽스",
    slug: "computer-graphics",
    category: "GENERAL",
    summary: "그래픽 디자인 실무와 관련 자격 대비를 위한 과정입니다.",
    description: "디자인 도구 활용과 그래픽 제작 원리를 학습하며 관련 자격 대비 실습을 진행합니다.",
    target: "디자인 자격증과 그래픽 실무를 함께 준비하는 수강생",
    curriculum: ["디자인 기본 이론", "그래픽 도구 실습", "작품 제작", "시험 유형 실습"],
    outcome: "그래픽 제작 흐름을 이해하고 자격 대비 포트폴리오 기반을 만들 수 있습니다.",
    duration: "상담 후 안내",
    schedule: "상담 후 안내",
    price: "상담 후 안내",
    capacity: "상담 후 안내",
    status: "RECRUITING",
    supportsTrainingCard: false,
  },
  {
    title: "엑셀실무",
    slug: "practical-excel",
    category: "GENERAL",
    summary: "업무에 바로 쓰는 함수, 표, 데이터 정리 중심의 엑셀 과정입니다.",
    description: "기초 입력부터 함수, 정렬, 필터, 차트, 실무 문서 작성까지 업무형 예제로 학습합니다.",
    target: "엑셀을 업무에 활용해야 하는 학생, 취업 준비생, 재직자",
    curriculum: ["엑셀 기본", "함수 활용", "데이터 정리", "보고서 작성"],
    outcome: "일상 업무에서 필요한 엑셀 문서를 스스로 만들고 관리할 수 있습니다.",
    duration: "상담 후 안내",
    schedule: "상담 후 안내",
    price: "상담 후 안내",
    capacity: "상담 후 안내",
    status: "RECRUITING",
    supportsTrainingCard: false,
  },
  {
    title: "컴퓨터활용능력1급",
    slug: "computer-literacy-level-1",
    category: "GENERAL",
    summary: "컴퓨터활용능력 1급 자격 취득을 위한 필기/실기 대비 과정입니다.",
    description: "스프레드시트와 데이터베이스 활용 능력을 시험 기준에 맞춰 체계적으로 준비합니다.",
    target: "컴퓨터활용능력 1급 자격증을 준비하는 수강생",
    curriculum: ["필기 핵심 이론", "엑셀 실기", "액세스 실기", "기출 문제 풀이"],
    outcome: "컴퓨터활용능력 1급 시험에 필요한 핵심 기능과 문제 풀이 감각을 익힐 수 있습니다.",
    duration: "상담 후 안내",
    schedule: "상담 후 안내",
    price: "상담 후 안내",
    capacity: "상담 후 안내",
    status: "RECRUITING",
    supportsTrainingCard: false,
  },
  {
    title: "워드프로세서",
    slug: "word-processor",
    category: "GENERAL",
    summary: "문서 작성과 편집 능력을 높이고 워드프로세서 자격을 준비합니다.",
    description: "문서 편집, 표, 스타일, 실전 문제 풀이를 통해 워드프로세서 시험을 준비합니다.",
    target: "문서 작성 기초와 자격증을 함께 준비하고 싶은 수강생",
    curriculum: ["문서 편집 기본", "표와 개체", "스타일 적용", "실전 모의고사"],
    outcome: "문서 작성 속도와 정확도를 높이고 자격 시험에 대비할 수 있습니다.",
    duration: "상담 후 안내",
    schedule: "상담 후 안내",
    price: "상담 후 안내",
    capacity: "상담 후 안내",
    status: "RECRUITING",
    supportsTrainingCard: false,
  },
  {
    title: "ITQ마스터",
    slug: "itq-master",
    category: "TRAINING_CARD",
    summary: "국민내일배움카드로 ITQ 주요 과목을 종합 준비하는 과정입니다.",
    description: "ITQ 한글, 엑셀, 파워포인트 등 주요 과목을 함께 학습하며 자격 취득을 목표로 합니다.",
    target: "국민내일배움카드로 사무 자격증을 준비하는 수강생",
    curriculum: ["ITQ 한글", "ITQ 엑셀", "ITQ 파워포인트", "기출 및 모의고사"],
    outcome: "여러 ITQ 과목을 한 번에 준비하며 사무 실무 능력도 함께 키울 수 있습니다.",
    duration: "상담 후 안내",
    schedule: "상담 후 안내",
    price: "국민내일배움카드 상담 후 안내",
    capacity: "상담 후 안내",
    status: "RECRUITING",
    supportsTrainingCard: true,
  },
  {
    title: "컴퓨터활용능력1급실기",
    slug: "computer-literacy-level-1-practical",
    category: "TRAINING_CARD",
    summary: "국민내일배움카드 적용 컴퓨터활용능력 1급 실기 집중 과정입니다.",
    description: "컴퓨터활용능력 1급 실기 시험에 필요한 엑셀과 액세스 기능을 집중 실습합니다.",
    target: "필기를 마쳤거나 실기 준비가 필요한 국민내일배움카드 수강생",
    curriculum: ["엑셀 고급 기능", "데이터베이스 실습", "실기 기출 분석", "모의고사"],
    outcome: "실기 시험에 필요한 작업 흐름과 시간 관리 능력을 익힐 수 있습니다.",
    duration: "상담 후 안내",
    schedule: "상담 후 안내",
    price: "국민내일배움카드 상담 후 안내",
    capacity: "상담 후 안내",
    status: "RECRUITING",
    supportsTrainingCard: true,
  },
  {
    title: "ITQ한글/엑셀",
    slug: "itq-hangul-excel",
    category: "TRAINING_CARD",
    summary: "국민내일배움카드로 ITQ 한글과 엑셀을 준비하는 과정입니다.",
    description: "사무 문서 작성에 자주 쓰이는 한글과 엑셀을 중심으로 ITQ 시험 대비를 진행합니다.",
    target: "한글과 엑셀 자격을 우선 준비하고 싶은 국민내일배움카드 수강생",
    curriculum: ["한글 문서 작성", "엑셀 함수", "표와 차트", "기출 유형 풀이"],
    outcome: "한글과 엑셀 문서 작성 능력을 갖추고 ITQ 시험에 대비할 수 있습니다.",
    duration: "상담 후 안내",
    schedule: "상담 후 안내",
    price: "국민내일배움카드 상담 후 안내",
    capacity: "상담 후 안내",
    status: "RECRUITING",
    supportsTrainingCard: true,
  },
  {
    title: "컴퓨터활용능력2급+워드프로세서",
    slug: "computer-literacy-level-2-word-processor",
    category: "TRAINING_CARD",
    summary: "국민내일배움카드로 컴활 2급과 워드프로세서를 함께 준비합니다.",
    description: "취업과 사무 실무에 활용도가 높은 컴퓨터활용능력 2급과 워드프로세서 과정을 병행합니다.",
    target: "사무 자격증을 효율적으로 준비하고 싶은 국민내일배움카드 수강생",
    curriculum: ["컴활 2급 필기/실기", "워드프로세서 실습", "기출 문제", "모의고사"],
    outcome: "사무직 기본 자격증을 함께 준비하며 문서와 엑셀 활용 능력을 높일 수 있습니다.",
    duration: "상담 후 안내",
    schedule: "상담 후 안내",
    price: "국민내일배움카드 상담 후 안내",
    capacity: "상담 후 안내",
    status: "RECRUITING",
    supportsTrainingCard: true,
  },
];

export function getCourseBySlug(slug: string) {
  return courses.find((course) => course.slug === slug);
}

export function getCoursesByCategory(category: CourseCategory) {
  return courses.filter((course) => course.category === category);
}
