import './globals.css';

export const metadata = {
  title: 'Movie Management System',
  description: 'Full-stack movie management application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
