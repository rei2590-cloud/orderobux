
import "./globals.css";

export const metadata = {
  title: "REI ROBUX | Racing Club",
  description: "Welcome to REI ROBUX Racing Club!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
