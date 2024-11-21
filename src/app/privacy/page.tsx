import PageTitle from "@/components/common/PageTitle";
import Card from "@/components/ui/Card";
import { ScrollText } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="lg:flex-1">
      <PageTitle title="Gizlilik Politikası" icon={ScrollText} />
      <Card className="font-serif p-8">
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">1. Genel Bilgiler</h2>
          <p className="">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            ultricies velit sit amet est aliquet, vel facilisis erat sodales.
            Nulla interdum metus sit amet risus vehicula, nec venenatis purus
            tincidunt. Sed porttitor elit ac turpis eleifend, et scelerisque
            felis laoreet. Nulla vel magna vel nunc tempor eleifend.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">2. Toplanan Veriler</h2>
          <p className="">
            Integer vel sapien at ligula facilisis tincidunt non non urna.
            Curabitur non libero vel eros aliquam laoreet. Cras gravida urna
            eget magna gravida viverra. Proin venenatis bibendum libero, sed
            consequat arcu tincidunt vel. Aenean tempor nisl id nulla viverra,
            at dictum sem consectetur.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">3. Verilerin Kullanımı</h2>
          <p className="">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">4. Çerezler (Cookies)</h2>
          <p className="">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">
            5. Üçüncü Taraf Bağlantıları
          </h2>
          <p className="">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">6. Veri Güvenliği</h2>
          <p className="">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">7. İletişim</h2>
          <p className="">
            Eğer bu Gizlilik Politikası hakkında herhangi bir sorunuz varsa,
            bizimle iletişime geçmekten çekinmeyin: E-posta:{" "}
            <a
              href="mailto:info@ornek.com"
              className="text-blue-700 hover:underline"
            >
              info@ornek.com
            </a>
          </p>
        </section>
      </Card>
    </div>
  );
}
