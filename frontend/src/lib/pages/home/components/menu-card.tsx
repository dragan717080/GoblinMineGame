import type { MenuCardProps } from '@/../interfaces';

export const MenuCard = ({ title, image, subtitle, linkTo, isSecondary = false }: MenuCardProps) => {
  return (
    <div className="glass-card py-4">
      <a href={linkTo}>
        <img className="pt-10" src={image} alt={title} className="h-56 md:h-64" />
        <div className={`menu-card-subtitle ${!isSecondary ? "bg-red" : "bg-secondary"}`}>{subtitle}</div>
        <h4 className="t-primary text-center">{title}</h4>
      </a>
    </div>
  );
};
