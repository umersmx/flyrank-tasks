import React from 'react';
import { Table, ArrowUpDown } from 'lucide-react';

export interface ColumnDef {
  key: string;
  header: string;
  align?: 'left' | 'center' | 'right';
}

export interface DataTableProps {
  title: string;
  description?: string;
  columns: ColumnDef[];
  rows: Record<string, string | number>[];
}

export function DataTable({ title, description, columns, rows }: DataTableProps) {
  return (
    <div className="glass-card overflow-hidden p-5 sm:p-6" data-testid="data-table">
      <div className="flex items-center gap-2 mb-1">
        <Table className="h-4 w-4 text-purple-400" />
        <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">Structured Dataset</span>
      </div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
      {description && <p className="text-xs text-slate-400 mb-4">{description}</p>}

      <div className="overflow-x-auto mt-4 rounded-xl border border-white/10">
        <table className="w-full text-left text-xs">
          <thead className="bg-white/5 uppercase tracking-wider text-slate-400 border-b border-white/10">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 font-semibold ${
                    col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{col.header}</span>
                    <ArrowUpDown className="h-3 w-3 opacity-40" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {rows.map((row, idx) => (
              <tr key={idx} className="transition hover:bg-white/[0.04]">
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-4 py-3 text-slate-200 font-medium ${
                      col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                    }`}
                  >
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
