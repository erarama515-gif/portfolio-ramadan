"""
أداة سطر أوامر لتغيير كلمة مرور المسؤول (admin).
CLI tool to change the admin user's password.

Usage from Render Shell:
    python -m app.initial_data.set_password <new_password>

Usage locally:
    python -m app.initial_data.set_password "MyN3wStr0ngP@ss!"
"""
import sys
from app.db.base import SessionLocal
from app.models import models
from app.core.security import get_password_hash


def main():
    if len(sys.argv) < 2:
        print("❌ كلمة المرور الجديدة مطلوبة.")
        print("   Usage: python -m app.initial_data.set_password <new_password>")
        sys.exit(1)

    new_password = sys.argv[1]
    if len(new_password) < 8:
        print("❌ كلمة المرور قصيرة جداً (الحد الأدنى 8 أحرف).")
        sys.exit(1)

    db = SessionLocal()
    try:
        admin = db.query(models.User).filter(models.User.username == "admin").first()
        if not admin:
            print("❌ مستخدم admin غير موجود في قاعدة البيانات.")
            sys.exit(1)

        admin.hashed_password = get_password_hash(new_password)
        db.commit()
        print(f"✅ تم تحديث كلمة مرور admin بنجاح.")
        print(f"   Old sessions remain valid until SECRET_KEY is rotated.")
    finally:
        db.close()


if __name__ == "__main__":
    main()
