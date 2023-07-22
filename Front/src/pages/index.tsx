import { GetServerSideProps } from "next";

export default function Page() {
  return <span></span>;
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/users",
      permanent: false,
    },
  };
};
