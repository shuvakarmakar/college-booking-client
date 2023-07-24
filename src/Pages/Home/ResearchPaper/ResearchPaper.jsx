const ResearchPaper = () => {
    const researchPapers = [
        {
            title: "Research Paper 1",
            link: "https://www.example.com/research-paper-1",
        },
        {
            title: "Research Paper 2",
            link: "https://www.example.com/research-paper-2",
        },
        {
            title: "Research Paper 3",
            link: "https://www.example.com/research-paper-3",
        },
    ];

    return (
        <div className="max-w-3xl mx-auto mt-4">
            <h2 className="text-3xl font-semibold my-8 text-center text-white">Recommended Research Papers</h2>
            <div className="bg-white rounded-lg shadow-md">
                <ul className="divide-y divide-gray-200">
                    {researchPapers.map((paper, index) => (
                        <li key={index} className="p-4">
                            <a
                                href={paper.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                {paper.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ResearchPaper;
