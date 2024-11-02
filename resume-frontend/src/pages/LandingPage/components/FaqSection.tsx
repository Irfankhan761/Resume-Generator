import { Collapse, Typography } from "antd";

export const FaqSection: React.FC = () => {
  const { Title } = Typography;
  const { Panel } = Collapse;
  return (
    <>
      {/* FAQ Section */}
      <div className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-12">
        <div>
          <Title level={2} className="text-3xl mb-6 text-gray-800">
            Frequently Asked Questions
          </Title>
          <Collapse accordion>
            {[
              {
                header: "How long does it take to create a CV?",
                content:
                  "With our platform, you can create a professional CV in just 15-30 minutes.",
              },
              {
                header: "Is my information secure?",
                content:
                  "We use top-tier encryption to protect your personal and professional data.",
              },
              {
                header: "Can I download my CV?",
                content:
                  "Yes! You can download your CV in multiple formats including PDF and DOCX.",
              },
            ].map((faq, index) => (
              <Panel key={index} header={faq.header} className="mb-2">
                <p>{faq.content}</p>
              </Panel>
            ))}
          </Collapse>
        </div>
        <img
          src="https://picsum.photos/602"
          alt="FAQs"
          className="rounded-lg shadow-lg w-full h-[500px] object-cover"
        />
      </div>
    </>
  );
};
