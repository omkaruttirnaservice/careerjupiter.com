import React, { useState } from "react";

const TreeStructure = () => {
  const [activeNode, setActiveNode] = useState(null); // Track which node is active

  // Data structure for the nested buttons
  const data = [
    {
      id: "10th",
      label: "10th Student",
      children: [
        {
          id: "11th",
          label: "11th",
          children: [
            {
              id: "12th",
              label: "12th",
              children: [
                {
                  id: "diploma",
                  label: "Diploma",
                  children: [
                    { id: "comp", label: "Computer" },
                    { id: "mech", label: "Mechanical" },
                    { id: "civil", label: "Civil" },
                    { id: "aids", label: "Aids" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "9th",
      label: "9th Student",
      children: [
        {
          id: "science",
          label: "Science",
          children: [
            {
              id: "arts",
              label: "Arts",
              children: [
                {
                  id: "engineering",
                  label: "Engineering",
                  children: [
                    { id: "it", label: "Information Technology" },
                    { id: "electrical", label: "Electrical" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  const handleClick = (nodeId) => {
    setActiveNode(nodeId); // Set clicked node as active to display next level
  };

  // Function to render the tree recursively
  const renderTree = (node) => (
    <div key={node.id} className="flex flex-col items-center mb-4">
      <button
        onClick={() => handleClick(node.id)}
        className="bg-blue-400 text-white py-2 px-4 rounded-md shadow-md mb-2"
      >
        {node.label}
      </button>
      {activeNode === node.id && node.children && (
        <div className="flex flex-col items-center mt-4">
          {node.children.map((child) => renderTree(child))}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col items-center bg-gray-50 py-10 px-5">
      <div className="flex flex-col items-center mb-10">
        <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
          👤
        </div>
        <h2 className="text-2xl font-semibold mt-3 text-gray-700">
          Student Hierarchy
        </h2>
      </div>

      {/* Render tree structure */}
      <div className="relative w-full max-w-2xl">
        {data.map((item) => renderTree(item))}
      </div>
    </div>
  );
};

export default TreeStructure;
