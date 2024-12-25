import Header from "../components/Header";
import NavigateHomeButton from "../components/NavigateHomeButton";

export default function ErrorPage() {
  return (
    <div className="container">
      <Header />
      <h5 className="text-center text-danger mt-4">Oops! This page doesn't exist!</h5>
      <NavigateHomeButton />
    </div>
  );
}
