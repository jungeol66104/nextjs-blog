import { AppProps } from "next/app";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
	console.log(pageProps);

	return <Component {...pageProps} />;
}
