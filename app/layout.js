import "./globals.css";

export const metadata = {
  title: "REI ROBUX | Happy Roblox Store",
  description: "Welcome to REI ROBUX! Your happy corner to shop Robux.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
