import { ReactNode } from "react";

const Container = ({ children } : { children: ReactNode }) => {
    return (
        <main className="w-full mx-5 xl:mx-0">
            <section className="mt-10 flex flex-col w-full gap-5 pr-10 xl:pr-5">
                {children}
            </section>
        </main>
    )
}

export default Container;