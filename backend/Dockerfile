# استخدم صورة جافا
FROM eclipse-temurin:17-jdk-alpine

# إعداد مجلد داخل الحاوية
WORKDIR /app

# نسخ كل الملفات إلى الحاوية
COPY . .

# بناء المشروع
RUN ./mvnw clean package -DskipTests

# تشغيل التطبيق
CMD ["java", "-jar", "target/اسم-ملف-jar-هنا.jar"]
