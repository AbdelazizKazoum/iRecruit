/* eslint-disable @typescript-eslint/no-explicit-any */
import PageHeader from "@/components/PageHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Locale } from "@/configs/i18n";

const faqs = {
  title: {
    fr: "Foire Aux Questions (F.A.Q.)",
    ar: "الأسئلة الشائعة",
    en: "Frequently Asked Questions (F.A.Q.)",
  },
  description: {
    fr: "Retrouvez ici les réponses aux questions les plus fréquemment posées par nos utilisateurs.",
    ar: "ستجد هنا إجابات على الأسئلة الأكثر شيوعاً من قبل مستخدمينا.",
    en: "Find answers to the most frequently asked questions from our users here.",
  },
  questions: [
    {
      question: {
        fr: "Comment créer un compte ?",
        ar: "كيف يمكنني إنشاء حساب؟",
        en: "How do I create an account?",
      },
      answer: {
        fr: "Vous pouvez créer un compte en cliquant sur le bouton 'S'inscrire' en haut à droite de la page et en remplissant le formulaire avec vos informations.",
        ar: "يمكنك إنشاء حساب بالنقر على زر 'التسجيل' في أعلى يمين الصفحة وملء النموذج بمعلوماتك.",
        en: "You can create an account by clicking the 'Sign Up' button at the top-right corner of the page and filling out the form with your details.",
      },
    },
    {
      question: {
        fr: "Comment réinitialiser mon mot de passe ?",
        ar: "كيف يمكنني إعادة تعيين كلمة المرور الخاصة بي؟",
        en: "How can I reset my password?",
      },
      answer: {
        fr: "Cliquez sur 'Mot de passe oublié' sur la page de connexion, entrez votre adresse e-mail, et suivez les instructions pour réinitialiser votre mot de passe.",
        ar: "انقر على 'نسيت كلمة المرور' في صفحة تسجيل الدخول، أدخل بريدك الإلكتروني واتبع التعليمات لإعادة تعيين كلمة المرور.",
        en: "Click on 'Forgot Password' on the login page, enter your email address, and follow the instructions to reset your password.",
      },
    },
    {
      question: {
        fr: "Comment puis-je postuler à une offre ?",
        ar: "كيف يمكنني التقديم على عرض عمل؟",
        en: "How can I apply for a job offer?",
      },
      answer: {
        fr: "Connectez-vous à votre compte, recherchez une offre qui vous intéresse, puis cliquez sur 'Postuler' et suivez les étapes.",
        ar: "قم بتسجيل الدخول إلى حسابك، ابحث عن عرض يهمك، ثم انقر على 'التقديم' واتبع الخطوات.",
        en: "Log in to your account, search for a job offer that interests you, then click 'Apply' and follow the steps.",
      },
    },
    {
      question: {
        fr: "Quels navigateurs sont pris en charge ?",
        ar: "ما هي المتصفحات المدعومة؟",
        en: "Which browsers are supported?",
      },
      answer: {
        fr: "Notre site est compatible avec les dernières versions de Google Chrome, Mozilla Firefox, Safari, et Microsoft Edge.",
        ar: "موقعنا متوافق مع أحدث إصدارات Google Chrome وMozilla Firefox وSafari وMicrosoft Edge.",
        en: "Our site is compatible with the latest versions of Google Chrome, Mozilla Firefox, Safari, and Microsoft Edge.",
      },
    },
    {
      question: {
        fr: "Comment contacter le service client ?",
        ar: "كيف يمكنني التواصل مع خدمة العملاء؟",
        en: "How can I contact customer service?",
      },
      answer: {
        fr: "Vous pouvez nous joindre via le formulaire de contact disponible sur la page 'Contactez-nous' ou en envoyant un e-mail à support@votresite.com.",
        ar: "يمكنك التواصل معنا عبر نموذج الاتصال المتوفر في صفحة 'اتصل بنا' أو بإرسال بريد إلكتروني إلى support@votresite.com.",
        en: "You can contact us through the contact form available on the 'Contact Us' page or by sending an email to support@yourwebsite.com.",
      },
    },
    {
      question: {
        fr: "Puis-je modifier mes informations personnelles ?",
        ar: "هل يمكنني تعديل معلوماتي الشخصية؟",
        en: "Can I modify my personal information?",
      },
      answer: {
        fr: "Oui, vous pouvez modifier vos informations personnelles en accédant à la section 'Mon profil' après vous être connecté à votre compte.",
        ar: "نعم، يمكنك تعديل معلوماتك الشخصية من خلال الدخول إلى قسم 'ملفي الشخصي' بعد تسجيل الدخول إلى حسابك.",
        en: "Yes, you can modify your personal information by accessing the 'My Profile' section after logging into your account.",
      },
    },
    {
      question: {
        fr: "Comment suivre l’état de ma candidature ?",
        ar: "كيف يمكنني متابعة حالة طلبي؟",
        en: "How can I track the status of my application?",
      },
      answer: {
        fr: "Après avoir postulé à une offre, vous pouvez suivre l’état de votre candidature dans la section 'Mes candidatures' de votre compte.",
        ar: "بعد التقديم على عرض، يمكنك متابعة حالة طلبك في قسم 'طلباتي' من حسابك.",
        en: "After applying for a job offer, you can track the status of your application in the 'My Applications' section of your account.",
      },
    },
    {
      question: {
        fr: "Est-ce que mes données personnelles sont sécurisées ?",
        ar: "هل بياناتي الشخصية آمنة؟",
        en: "Are my personal data secure?",
      },
      answer: {
        fr: "Oui, nous utilisons des technologies avancées pour assurer la sécurité de vos données personnelles conformément à notre politique de confidentialité.",
        ar: "نعم، نستخدم تقنيات متقدمة لضمان أمان بياناتك الشخصية وفقًا لسياسة الخصوصية الخاصة بنا.",
        en: "Yes, we use advanced technologies to ensure the security of your personal data in accordance with our privacy policy.",
      },
    },
    {
      question: {
        fr: "Comment supprimer mon compte ?",
        ar: "كيف يمكنني حذف حسابي؟",
        en: "How can I delete my account?",
      },
      answer: {
        fr: "Pour supprimer votre compte, veuillez nous contacter via le formulaire de contact ou envoyer un e-mail à support@votresite.com avec une demande de suppression.",
        ar: "لحذف حسابك، يرجى التواصل معنا عبر نموذج الاتصال أو إرسال بريد إلكتروني إلى support@votresite.com مع طلب الحذف.",
        en: "To delete your account, please contact us through the contact form or send an email to support@yourwebsite.com with a deletion request.",
      },
    },
    {
      question: {
        fr: "Puis-je me désinscrire des e-mails promotionnels ?",
        ar: "هل يمكنني إلغاء الاشتراك في الرسائل الترويجية؟",
        en: "Can I unsubscribe from promotional emails?",
      },
      answer: {
        fr: "Oui, vous pouvez vous désinscrire en cliquant sur le lien 'Se désabonner' présent en bas de chaque e-mail promotionnel que vous recevez.",
        ar: "نعم، يمكنك إلغاء الاشتراك بالنقر على رابط 'إلغاء الاشتراك' الموجود في أسفل كل رسالة بريد إلكتروني ترويجية تتلقاها.",
        en: "Yes, you can unsubscribe by clicking on the 'Unsubscribe' link at the bottom of each promotional email you receive.",
      },
    },
  ],
};

const Page = ({ params }: { params: { lang: Locale } }) => {
  const lang = params.lang || "fr";

  return (
    <div className="max-w-screen-2xl mt-24 pb-24 px-4 sm:px-8 xl:px-16 mx-auto">
      <div className="space-y-6 py-10 lg:p-10 pb-16">
        <PageHeader
          title={faqs.title[lang]}
          description={faqs.description[lang]}
        />
        <Separator className="my-6" />
        <div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.questions.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{item.question[lang]}</AccordionTrigger>
                <AccordionContent>{item.answer[lang]}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Page;
