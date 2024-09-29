import Footer from "@/components/shared/Footer/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";

const MaindLayout = ({ children }) => {
  return (
    <div>
      <div>
        <div>
          <Navbar />
        </div>

        <div>{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default MaindLayout;
