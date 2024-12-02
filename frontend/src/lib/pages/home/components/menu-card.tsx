import type { MenuCardProps } from '@/../interfaces';

export const MenuCard = ({ title, image, subtitle, linkTo, isSecondary = false }: MenuCardProps) => {
  return (
    <div className="glass-card py-4">
      <a href={linkTo}>
        <img src={image} alt={title} className="pt-10 h-56 md:h-64" />
        <div className={`menu-card-subtitle ${!isSecondary ? "bg-red" : "bg-secondary"}`}>{subtitle}</div>
        <h4 className="t-primary text-center">{title}</h4>
      </a>
    </div>
  );
};
