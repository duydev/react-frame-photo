import './style.css';

export default props => (
  <div className="w3-container layout">
    <div className="w3-card-4">{props.children}</div>
    <p className="footer">
      &copy; {new Date().getFullYear()} - Make with <span>❤</span> by{' '}
      <a href="https://duydev.me">Trần Nhật Duy</a>.
    </p>
  </div>
);
