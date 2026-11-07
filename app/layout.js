
import "./globals.css";

export const metadata = {
  title: "REI ROBUX — Happy Gaming Playground",
  description:
    "Welcome to REI ROBUX. Your happy Roblox gaming playground!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
