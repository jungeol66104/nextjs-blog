import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Date from "../components/date";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = () => {
	const allPostsData = getSortedPostsData();
	return {
		props: {
			allPostsData,
		},
	};
};

export default function Home({
	allPostsData,
}: {
	allPostsData: { id: string; date: string; title: string }[];
}) {
	return (
		<Layout home>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<section className={utilStyles.headingMd}>
				<p>
					I am interested in overcoming my personal obstacles and the challenges faced by
					humanity.
				</p>
			</section>
			<section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
				<h2 className={utilStyles.headingLg}>Blog</h2>
				<ul className={utilStyles.list}>
					{allPostsData.map(({ id, date, title }) => (
						<li className={utilStyles.listItem} key={id}>
							<Link href={`posts/${id}`}>{title}</Link>
							<br />
							<div className={utilStyles.lightText}>
								<Date dateString={date} />
							</div>
						</li>
					))}
				</ul>
			</section>
		</Layout>
	);
}
