
import "./globals.css";

export const metadata = {
  title: "REI ROBUX | Gaming Store",
  description: "Your next Roblox adventure starts here!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
