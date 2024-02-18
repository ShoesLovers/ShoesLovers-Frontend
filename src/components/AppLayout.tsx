import '../styles/login.css';
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="Cover">
      <img
        className="CoverImage"
        src="src\assets\images\chess.jpg"
        alt="cover_image"
      />
      <div className="Box_Details">
        <div className="shoes_image">
          <img src="src\assets\images\pic.png" className="shoes_image_style" />
        </div>
        {children}
      </div>
    </div>
  );
}
