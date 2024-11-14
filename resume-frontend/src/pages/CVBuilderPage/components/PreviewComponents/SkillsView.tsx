import { Card, Typography, Tag } from "antd";
import { Skill } from "../types";

interface SkillPreviewProps {
  data: Skill[];
}

const { Title, Text } = Typography;

export const SkillPreview = ({ data }: SkillPreviewProps) => {
  return (
    <Card className="mb-8">
      <Title level={3}>Skills</Title>
      <div className="space-y-4">
        {data.map((skillCategory) => (
          <div
            key={skillCategory.id}
            className="border rounded-lg p-4 space-y-2"
          >
            <Text strong className="text-lg">
              {skillCategory.category}
            </Text>
            <div className="flex flex-wrap gap-2 mt-2">
              {skillCategory.skills.map((skill, index) => (
                <Tag color="blue" key={index}>
                  {skill}
                </Tag>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

// import { Card, Typography, Divider } from "antd";
// import { Skill } from "../types";

// interface SkillPreviewProps {
//   data: Skill[];
// }

// const { Title, Text } = Typography;

// export const SkillPreview = ({ data }: SkillPreviewProps) => {
//   return (
//     <Card className="mb-8">
//       <div className="flex items-center mb-4">
//         <Title level={3} className="mr-2">
//           Skills
//         </Title>
//       </div>
//       <div className="space-y-4">
//         {data.map((skill) => (
//           <div key={skill.id} className="border rounded-lg p-4 space-y-2">
//             <Text strong className="text-lg">
//               {skill.category}
//             </Text>
//             <div className="flex flex-wrap gap-2">
//               {skill.skills.map((s, index) => (
//                 <Text key={index} className="bg-gray-200 px-2 py-1 rounded-md">
//                   {s}
//                 </Text>
//               ))}
//             </div>
//             <Divider />
//           </div>
//         ))}
//       </div>
//     </Card>
//   );
// };
