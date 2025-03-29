"use client";
import { useEffect } from "react";
import Link from "next/link";
import { usePageTitle } from "@/hooks";

export default function PrivacyPage() {
  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle("Gizlilik Politikası ve Kullanım Koşulları");
  }, [setTitle]);

  return (
    <div className="lg:flex-1">
      <div className="p-4 font-sans">
        <div className="mx-auto max-w-3xl p-6">
          <p className="mb-4">
            Bu belge, Üniversite Bazlı Sosyal Paylaşım Platformu(bundan sonra
            platform olarak anılacaktır) tarafından sunulan hizmetlerin gizlilik
            politikasını ve kullanım koşullarını kapsar. Platformu kullanarak bu
            koşulları kabul etmiş sayılırsınız.
          </p>

          <section className="mb-4">
            <h2 className="mb-1 text-lg font-semibold">1. Toplanan Veriler</h2>
            <p>
              Platform, kullanıcı deneyimini sağlamak ve yasal gereklilikleri
              yerine getirmek amacıyla kullanıcı verilerini ve yasal
              zorunluluklar çerçevesinde IP adresleri ile log verilerini saklar.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="mb-1 text-lg font-semibold">
              2. Verilerin Kullanımı
            </h2>
            <p>
              Veriler, platformun işlevselliği, moderasyon ve yasal
              gereklilikler için işlenebilir. Bunun dışında, kullanıcıların
              kişisel verileri üçüncü şahıslarla paylaşılmaz.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="mb-1 text-lg font-semibold">
              3. Kullanım Koşulları
            </h2>
            <p>
              Kullanıcılar, paylaştıkları içeriklerden tamamen sorumlu olup bu
              paylaşımlarında Türkiye Cumhuriyeti yasalarına uymak zorundadır.
              Platform, içeriklerden doğan yasal sorumluluğu kabul etmez.
              Moderatörler, yasal risk taşıyan içerikleri silebilir.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="mb-1 text-lg font-semibold">
              4. Çerezler ve Üçüncü Taraflar
            </h2>
            <p>
              Platform, zorunlu ve analitik çerezler kullanır; çerezleri kabul
              etmek zorunludur. Veriler, yasal zorunluluklar hariç üçüncü
              taraflarla paylaşılmaz.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="mb-1 text-lg font-semibold">5. Kullanıcı Hakları</h2>
            <p>
              Her türlü bildirim, şikayet, içerik kaldırma gibi talepleriniz
              için mesajlarınızı{" "}
              <Link href={"/contact"} className="underline">
                destek
              </Link>{" "}
              sayfasından iletebilirsiniz.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="mb-1 text-lg font-semibold">
              6. Güncellemeler ve İletişim
            </h2>
            <p>
              Platform bu belgeyi güncelleyebilir; değişiklikler yayınlandığında
              geçerli olur.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
