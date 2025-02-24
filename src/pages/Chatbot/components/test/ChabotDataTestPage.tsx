import React from "react";
import Image from "next/image";
import { questionCategories } from "@/src/constants/ChatbotData";

// API 호출 함수 (예제)
const callApi = (parameter: number) => {
  console.log("API 호출:", parameter);
  // 실제 API 호출 로직 작성
};

const QuestionCategoriesComponent = () => {
  const { baseballCategories, questionCategories: categories } = questionCategories;

  return (
    <div className="p-4 space-y-8">
      {/* Stadium List */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-lg font-bold text-blue-600 mb-4">⚾ Stadium List</h2>
        <ul className="space-y-2">
          {baseballCategories.frontendValues.map((stadium: string, index: number) => (
            <li
              key={index}
              className="py-2 px-4 bg-gray-100 rounded-md text-gray-800 hover:bg-gray-200 cursor-pointer"
            >
              {stadium}
            </li>
          ))}
        </ul>
      </div>

      {/* User Messages */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-lg font-bold text-green-600 mb-4">💬 User Messages</h2>
        <ul className="space-y-2">
          {baseballCategories.userMessage.map((message: string, index: number) => (
            <li
              key={index}
              className="py-2 px-4 bg-gray-100 rounded-md text-gray-800 hover:bg-gray-200"
            >
              {message}
            </li>
          ))}
        </ul>
      </div>

      {/* Question Categories */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-lg font-bold text-purple-600 mb-4">📚 Question Categories</h2>
        <ul className="space-y-4">
          {(Object.keys(categories) as (keyof typeof categories)[]).map((key) => {
            const category = categories[key];

            return (
              <li key={key} className="p-4 bg-gray-50 rounded-lg shadow">
                <h3 className="text-md font-semibold text-gray-700 mb-2">
                  {category.frontendValue}
                </h3>

                {/* 타입 좁히기: answer가 있는 경우 */}
                {"answer" in category && category.answer && (
                  <ul className="space-y-1">
                    {category.answer.map((answer, index) => (
                      <li
                        key={index}
                        className="py-1 px-2 bg-gray-100 rounded-md text-gray-800 hover:bg-gray-200"
                      >
                        {answer}
                      </li>
                    ))}
                  </ul>
                )}

                {/* 타입 좁히기: subcategories가 있는 경우 */}
                {"subcategories" in category && category.subcategories && (
                  <ul className="space-y-1">
                    {category.subcategories.frontendValues.map((value, index) => (
                      <li
                        key={index}
                        className="py-1 px-2 bg-gray-100 rounded-md text-blue-700 hover:bg-blue-100 cursor-pointer"
                        onClick={() =>
                          callApi(category.subcategories!.backendParameters[index])
                        }
                      >
                        {value}
                      </li>
                    ))}
                  </ul>
                )}

                {/* 타입 좁히기: image가 있는 경우 */}
                {"image" in category && category.image && (
                  <div className="mt-4">
                    <Image
                      src={category.image}
                      alt="Category Icon"
                      className="max-w-full h-auto rounded-md"
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default QuestionCategoriesComponent;
