import css from './Container.module.css';

interface Prop {
  children: React.ReactNode;
}

const Container = ({ children }: Prop) => {
  return <div className={css.container}>{children}</div>;
};

export default Container;
