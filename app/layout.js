
import "./globals.css";

export const metadata = {
  title: "REI ROBUX | Happy Gaming Playground",
  description: "REI ROBUX - Your Happy Roblox Gaming Store!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
