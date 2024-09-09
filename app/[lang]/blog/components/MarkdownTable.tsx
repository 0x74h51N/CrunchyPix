import CustomLink from '@/components/CustomLink';
import { TableHTMLAttributes, HTMLAttributes } from 'react';
import { Components } from 'react-markdown';

const MarkdownTable: Components = {
  table: (props: TableHTMLAttributes<HTMLTableElement>) => (
    <table className="table table-zebra table-sm" {...props} />
  ),
  thead: (props: HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="table-header-group bg-base-300" {...props} />
  ),
  th: (props: HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="text-lg p-3 text-center first:text-right first:border-none border-l-2 border-base-100"
      {...props}
    />
  ),
  td: (props: HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className="table-cel first:text-right paragraph  first:border-none border-l-2 border-base-100"
      {...props}
    />
  ),
  tr: (props: HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="paragraph" {...props} />
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
