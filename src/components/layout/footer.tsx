import {
  SiFacebook,
  SiInstagram,
  SiMastercard,
  SiPaypal,
  SiPinterest,
  SiVisa,
  SiX,
} from "@icons-pack/react-simple-icons";
import { Logo } from "../logo";

const navLinks = [
  {
    title: "CAREERS",
    href: "#",
  },
  {
    title: "GIFT CARDS",
    href: "#",
  },
  {
    title: "GIVING BACK",
    href: "#",
  },
  {
    title: "DO NOT SELL MY INFORMATION",
    href: "#",
  },
];

const helpLinks = [
  {
    title: "HELP CENTER",
    href: "#",
  },
  {
    title: "REFUNDS & RETURNS",
    href: "#",
  },
  {
    title: "PROMOTION TERMS",
    href: "#",
  },
];

const socialIcons = [
  {
    icon: <SiFacebook size={24} />,
    label: "Facebook",
    href: "#",
  },
  {
    icon: <SiInstagram size={24} />,
    label: "Instagram",
    href: "#",
  },
  {
    icon: <SiX size={24} />,
    label: "Twitter",
    href: "#",
  },
  {
    icon: <SiPinterest size={24} />,
    label: "Pinterest",
    href: "#",
  },
];

const paymentIcons = [
  {
    icon: <SiVisa className="h-8 w-auto text-green-100" />,
  },
  {
    icon: <SiMastercard className="h-8 w-auto text-green-100" />,
  },
  {
    icon: <SiPaypal className="h-8 w-auto text-green-100" />,
  },
  {
    icon: (
      <svg
        x={0}
        y={0}
        viewBox="0 0 507 181"
        className="h-8 w-auto text-green-100"
      >
        <path
          d="M118.2 48c-7.2 0-13.8 2.4-19.1 6.4-5.3-4-12-6.4-19.1-6.4-17.7 0-32 14.3-32 31.9V133h24.5V79.6c0-4 3.2-7.2 7.2-7.2s7.2 3.2 7.2 7.2V133h24.5V79.6c0-4 3.2-7.2 7.2-7.2s7.2 3.2 7.2 7.2V133h24.5V79.9c-.2-17.6-14.5-31.9-32.1-31.9zM416.5 48C393 48 374 67 374 90.5s19 42.5 42.5 42.5S459 114 459 90.5 440 48 416.5 48zm0 60.6c-10 0-18.1-8.1-18.1-18.1s8.1-18.1 18.1-18.1 18.1 8.1 18.1 18.1c-.1 10-8.2 18.1-18.1 18.1zM329.8 48c-7.2 0-13.8 2.4-19.1 6.4-5.3-4-12-6.4-19.1-6.4-17.6 0-31.9 14.3-31.9 31.9V133h24.5V79.6c0-4 3.2-7.2 7.2-7.2s7.2 3.2 7.2 7.2V133h24.5V79.6c0-4 3.2-7.2 7.2-7.2s7.2 3.2 7.2 7.2V133H362V79.9c-.3-17.6-14.6-31.9-32.2-31.9zM204.8 48c-23.5 0-42.5 19-42.5 42.5s19 42.5 42.5 42.5 42.5-19 42.5-42.5-19-42.5-42.5-42.5zm0 60.6c-10 0-18.1-8.1-18.1-18.1s8.1-18.1 18.1-18.1 18.1 8.1 18.1 18.1c0 10-8.1 18.1-18.1 18.1z"
          className="st1"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-green-100 py-10">
      <div className="container md:flex md:justify-between">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="mb-6 md:mb-0">
            <Logo />
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:gap-10">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  className="text-sm hover:underline"
                >
                  {link.title}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              {helpLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  className="text-sm hover:underline"
                >
                  {link.title}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 md:mt-0">
          <h4 className="text-xl font-semibold mb-4">Have a question?</h4>
          <p className="mb-4">We&apos;re always here to lend a helping hand.</p>
          <p className="mb-8">
            Consumer Care Team hours are <br /> Monday-Friday, 9am - 5pm ICT
          </p>
          <h5 className="font-semibold mb-2">CONTACT US</h5>
          <div className="flex space-x-4">
            {socialIcons.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-gray-600 hover:text-black"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container mt-8 text-sm flex flex-col md:flex-row md:justify-between">
        <a href="#" className="hover:underline">
          PRIVACY POLICY
        </a>
        <a href="#" className="hover:underline">
          TERMS OF SERVICE
        </a>
        <a href="#" className="hover:underline">
          ACCESSIBILITY STATEMENT
        </a>
      </div>

      <div className="container mt-4 flex justify-end items-center gap-1">
        {paymentIcons.map((icon, index) => (
          <div key={index} className="bg-green-950 py-0.5 px-2 rounded-lg">
            {icon.icon}
          </div>
        ))}
      </div>
    </footer>
  );
}
