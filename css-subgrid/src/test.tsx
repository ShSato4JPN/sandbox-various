import { useState } from "react";

export default function SubgridTable({data}: SubgridTableProps) {
  const {labels, data: columnData, columnFlags} = data;
  const numROws= columnData[0]?.length || 0;
  const [fucused, setFocusedColumn] = useState<number | null>(null);
  const [columnOrder, setColumnOrder] = useState<number[]>(() => Array.from({length: numRows}, (_, i)=>i)

}