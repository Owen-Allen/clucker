import Link from 'next/link';

const Custom404 = () => (
  <div className="flex min-h-screen flex-col items-center justify-center px-8 font-mono py-4 bg-sky-400">
    <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
    <p className="text-xl mb-8">The page you are looking for does not exist.</p>
    <Link className="text-sky-800 hover:underline" href="/">
      Go back to the feed
    </Link>
  </div>
);

export default Custom404;
