import React, { useEffect, useState } from "react";
import { canUseDOM } from "vtex.render-runtime";

// Styles
import styles from "./styles.css";

interface PDPSKUProps {

}

interface ItemObject {
  ean: string
  imageUrl: string
  itemId: string
  name: string
  referenceId: Array<ReferenceObject>
}

interface ReferenceObject {
  Key: string
  Value: string
}

const PDPSKU: StorefrontFunctionComponent<PDPSKUProps> = ({ }) => {
  const [selectedSkuInfo, setSelectedSkuInfo] = useState<ItemObject>();

  const handleMessage = (e: any) => {
    const eventName = e.data.eventName;
    if (eventName !== "vtex:productView") return;

    const selectedSku: ItemObject = e.data.product?.selectedSku;
    if (!selectedSku) return;

    setSelectedSkuInfo(selectedSku);
  }

  useEffect(() => {
    if (!canUseDOM) return;

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    }
  })

  return (
    <div className={styles.container}>
      {selectedSkuInfo && `${selectedSkuInfo.name} - ${selectedSkuInfo.referenceId[0].Value}`}
    </div>
  );
};

PDPSKU.schema = {
  title: "PDPSKU",
  description: "",
  type: "object",
  properties: {}
};

export default PDPSKU;
