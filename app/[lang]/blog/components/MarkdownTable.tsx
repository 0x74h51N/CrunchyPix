import CustomLink from '@/components/CustomLink';
import { TableHTMLAttributes, HTMLAttributes } from 'react';
import { Components } from 'react-markdown';

const MarkdownTable: Components = {
  table: (props: TableHTMLAttributes<HTMLTableElement>) => (
    <table className="min-w-full table table-zebra paragraph" {...props} />
  ),
  th: (props: HTMLAttributes<HTMLTableCellElement>) => (
    <th className="text-lg" {...props} />
  ),
  td: (props: HTMLAttributes<HTMLTableCellElement>) => (
    <td className="" {...props} />
  ),
  tr: (props: HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="" {...props} />
  ),
  a: ({
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <CustomLink href={props.href as string}>
      {children as JSX.Element}
    </CustomLink>
  ),
};

export default MarkdownTable;
