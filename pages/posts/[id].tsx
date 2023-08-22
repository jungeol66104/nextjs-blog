import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import Layout from "../../components/layout";
import Date from "../../components/date";
import { getAllPostIds, getPostData } from "../../lib/posts";
import utilStyles from "../../styles/utils.module.css";

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = getAllPostIds();
	return {
		paths, // arr of obj which has property params which has property id
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const postData = await getPostData(params?.id as string);

	return {
		props: {
			postData,
		},
	};
};

export default function Post({
	postData,
}: {
	postData: {
		title: string;
		date: string;
		contentHtmlWithNewLine: string;
	};
}) {
	return (
		<Layout>
			<Head>
				<title>{postData.title}</title>
			</Head>
			<h1 className={utilStyles.headingXl}>{postData.title}</h1>
			<br />
			<div className={utilStyles.lightText}>
				<Date dateString={postData.date} />
			</div>
			<br />
			<div dangerouslySetInnerHTML={{ __html: postData.contentHtmlWithNewLine }}></div>
		</Layout>
	);
}
