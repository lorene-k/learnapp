import SnakeGame from "./components/snake-game";
import Link from 'next/link';
import styles from "./page.module.css";

export default function Home() {
    return (
        <div>
            <SnakeGame />
        </div>
    );
}


// export default function Home() {
//     return (
//         <div className={styles.page}>
//             <main className={styles.main}>

//                 <div className={styles.ctas}>
//                     <Link
//                         className={styles.primary}
//                         href="/posts/first-post"
//                     >
//                         SALT
//                     </Link>
//                     <Link
//                         className={styles.secondary}
//                         href="https://www.google.com/search?q=PEPPER&sca_esv=d9aed0d2e07b8d4PEPPER8&udm=2&biw=960&bih=754&ei=zeXzaOzLHd2rkdUPpqGi2As&ved=0ahUKEwis5oqqua6QAxXdVaQEHaaQCLsQ4dUDCBI&uact=5&oq=PEPPER&gs_lp=Egtnd3Mtd2l6LWltZyIGUEVQUEVSMgoQABiABBhDGIoFMgoQABiABBhDGIoFMgoQABiABBhDGIoFMgoQABiABBhDGIoFMgoQABiABBhDGIoFMgoQABiABBhDGIoFMgoQABiABBhDGIoFMgUQABiABDIFEAAYgAQyBRAAGIAESJIGUABYygRwAHgAkAEAmAE1oAGeAqoBATa4AQPIAQD4AQGYAgagArYCmAMAkgcBNqAH9ByyBwE2uAe2AsIHBTAuNS4xyAcS&sclient=gws-wiz-img"
//                     >
//                         PEPPER
//                     </Link>
//                 </div>
//             </main>

//             <footer className={styles.footer}>
//                 <a>
//                     Both.
//                 </a>
//             </footer>
//         </div>
//     );
// }
