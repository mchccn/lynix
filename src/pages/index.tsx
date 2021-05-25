import { GetStaticProps } from "next";

export default function Index({ assetPrefix }: { assetPrefix: string }) {
    return <div></div>;
}

//@ts-ignore
export const getStaticProps: GetStaticProps = () => {
    return {
        props: {
            assetPrefix: process.env.NODE_ENV === "production" ? "/lynix" : "",
        },
    };
};
