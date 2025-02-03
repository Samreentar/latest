// import "./globals.css";
// import Navbar from "./components/Navbar/index";
// import Footer from "./components/Footer/Footer";

// export const metadata = {
//   title: "EXAM_TECH",
//   description: "Generated by create next app",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>
//         <Navbar />
//         {children}
//         <Footer />
//       </body>
//     </html>
//   );
// }
"use client";
import "./globals.css";
import LandingNavbar from "../components/LNavbar/LandingNavbar";
import Footer from "../components/Footer/Footer";
import { usePathname } from "next/navigation";

// `export const metadata = {
//   title: "EXAM_TECH",
//   description: "Generated by create next app",
// };`

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Determine if the current path is the dashboard
  const isDashboard = pathname.startsWith("/Dashboard");

  return (
    <html lang="en">
      <body>
        {!isDashboard && <LandingNavbar />}
        {children}
        {!isDashboard && <Footer />}
      </body>
    </html>
  );
}
