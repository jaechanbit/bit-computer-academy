import bcrypt from "bcryptjs";
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { CourseCategory, CourseStatus, PrismaClient } from "@prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set.");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const courses = [
  ["ITQ", "itq", CourseCategory.GENERAL, false, "ITQ 자격증 대비 과정입니다.", "ITQ 자격증 취득을 목표로 문서 작성과 실무 활용 능력을 학습합니다."],
  ["정보처리", "information-processing", CourseCategory.GENERAL, false, "정보처리 관련 자격 및 기초 이론 과정입니다.", "정보처리 분야의 기본 개념과 자격 대비 내용을 학습합니다."],
  ["사무자동화", "office-automation", CourseCategory.GENERAL, false, "사무자동화 실무와 자격 대비 과정입니다.", "문서, 스프레드시트, 사무 자동화 활용 능력을 학습합니다."],
  ["포토샵", "photoshop", CourseCategory.GENERAL, false, "포토샵 기초부터 실무 활용까지 배우는 과정입니다.", "이미지 편집, 보정, 디자인 작업에 필요한 포토샵 기능을 학습합니다."],
  ["일러스트", "illustrator", CourseCategory.GENERAL, false, "일러스트 디자인 실무 과정입니다.", "벡터 그래픽, 로고, 인쇄물 제작에 필요한 일러스트 기능을 학습합니다."],
  ["컴퓨터그래픽스", "computer-graphics", CourseCategory.GENERAL, false, "컴퓨터그래픽스 자격 및 디자인 실무 과정입니다.", "그래픽 디자인과 관련 자격 대비 내용을 학습합니다."],
  ["엑셀실무", "practical-excel", CourseCategory.GENERAL, false, "업무에 바로 쓰는 엑셀 실무 과정입니다.", "함수, 표, 데이터 정리 등 실무 중심의 엑셀 활용법을 학습합니다."],
  ["컴퓨터활용능력1급", "computer-literacy-level-1", CourseCategory.GENERAL, false, "컴퓨터활용능력 1급 자격 대비 과정입니다.", "스프레드시트와 데이터베이스 활용 능력을 자격 시험 기준에 맞춰 학습합니다."],
  ["워드프로세서", "word-processor", CourseCategory.GENERAL, false, "워드프로세서 자격 대비 과정입니다.", "문서 작성과 편집 능력을 중심으로 워드프로세서 자격을 준비합니다."],
  ["ITQ마스터", "itq-master", CourseCategory.TRAINING_CARD, true, "국민내일배움카드 적용 ITQ 종합 과정입니다.", "ITQ 주요 과목을 종합적으로 준비하는 국민내일배움카드 과정입니다."],
  ["컴퓨터활용능력1급실기", "computer-literacy-level-1-practical", CourseCategory.TRAINING_CARD, true, "국민내일배움카드 적용 컴퓨터활용능력 1급 실기 과정입니다.", "컴퓨터활용능력 1급 실기 시험에 필요한 내용을 집중 학습합니다."],
  ["ITQ한글/엑셀", "itq-hangul-excel", CourseCategory.TRAINING_CARD, true, "국민내일배움카드 적용 ITQ 한글/엑셀 과정입니다.", "ITQ 한글과 엑셀 과목을 중심으로 자격 취득을 준비합니다."],
  ["컴퓨터활용능력2급+워드프로세서", "computer-literacy-level-2-word-processor", CourseCategory.TRAINING_CARD, true, "국민내일배움카드 적용 자격증 병행 과정입니다.", "컴퓨터활용능력 2급과 워드프로세서를 함께 준비하는 과정입니다."],
] as const;

async function main() {
  const username = process.env.ADMIN_USERNAME;
  const initialPassword = process.env.ADMIN_INITIAL_PASSWORD;
  const adminName = process.env.ADMIN_NAME ?? "관리자";

  if (username && initialPassword) {
    const passwordHash = await bcrypt.hash(initialPassword, 12);

    await prisma.admin.upsert({
      where: { username },
      update: { name: adminName },
      create: {
        username,
        passwordHash,
        name: adminName,
      },
    });
  }

  for (const [index, course] of courses.entries()) {
    const [title, slug, category, supportsTrainingCard, summary, description] = course;

    await prisma.course.upsert({
      where: { slug },
      update: {
        title,
        category,
        supportsTrainingCard,
        summary,
        description,
      },
      create: {
        title,
        slug,
        category,
        supportsTrainingCard,
        summary,
        description,
        status: CourseStatus.RECRUITING,
        isPublished: true,
        displayOrder: (index + 1) * 10,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
