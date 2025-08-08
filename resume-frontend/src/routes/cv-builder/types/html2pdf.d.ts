declare module "html2pdf.js" {
  interface Html2PdfOptions {
    margin?: number | number[];
    filename?: string;
    image?: {
      type?: string;
      quality?: number;
    };
    html2canvas?: {
      scale?: number;
      useCORS?: boolean;
      letterRendering?: boolean;
      logging?: boolean;
    };
    jsPDF?: {
      unit?: string;
      format?: string;
      orientation?: "portrait" | "landscape";
      compress?: boolean;
    };
    pagebreak?: {
      mode?: string | string[];
      before?: string[];
      after?: string[];
      avoid?: string[];
    };
    enableLinks?: boolean;
  }

  interface Html2PdfObject {
    set: (opt: Html2PdfOptions) => Html2PdfObject;
    from: (element: HTMLElement) => Html2PdfObject;
    save: () => Promise<void>;
    output: (type: string, options?: any) => Promise<any>;
  }

  interface Html2PdfStatic {
    (): Html2PdfObject;
  }

  const html2pdf: Html2PdfStatic;
  export = html2pdf;
}
