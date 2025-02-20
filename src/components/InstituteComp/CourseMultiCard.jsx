import CourseCard from "./CourseCard";

const CourseMultiCard = ()=>{

     const courses = [
       {
         image:
           "https://media.istockphoto.com/id/1358014313/photo/group-of-elementary-students-having-computer-class-with-their-teacher-in-the-classroom.jpg?s=612x612&w=0&k=20&c=3xsykmHXFa9ejL_sP2Xxiow7zdtmKvg15UxXFfgR98Q=",
         title: "Web Design & Development Course",
         subtitle: "for Beginners",
         rating: 3,
         reviews: 103,
         instructor: "John Doe",
         duration: "1.49 Hrs",
         students: "30",
         price: "149.00",
       },
       {
         image:
           "https://media.istockphoto.com/id/1262283526/photo/indian-girl-student-wear-headphones-learning-online-watching-webinar-class-looking-at-laptop.jpg?s=612x612&w=0&k=20&c=U53dUb_GsOqsngIbknNaIQhW32dGbTIbCDSAIKV2nHM=",
         title: "Web Design & Development Course",
         subtitle: "for Beginners",
         rating: 5,
         reviews: 993,
         instructor: "John Doe",
         duration: "1.49 Hrs",
         students: "30",
         price: "149.00",
       },
       {
         image:
           "https://media.istockphoto.com/id/1338845952/photo/young-student-stock-photo.jpg?s=612x612&w=0&k=20&c=Gi-gWsYgA11AzP3bKA_xCArItRNJ2hqwNB18RX6QfPo=",
         title: "Web Design & Development Course",
         subtitle: "for Beginners",
         rating: 2,
         reviews: 253,
         instructor: "John Doe",
         duration: "1.49 Hrs",
         students: "30",
         price: "149.00",
       },
     ];

    return (
      <>
        <div className="min-h-screen bg-gray-50 py-10">
          <CourseCard heading="Popular Courses" courses={courses} />
        </div>
      </>
    );
}

export default CourseMultiCard;