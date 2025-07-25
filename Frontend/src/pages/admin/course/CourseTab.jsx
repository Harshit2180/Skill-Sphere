import RichTextEditor from '@/components/RichTextEditor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEditCourseMutation, useGetCourseByIdQuery, usePublishCourseMutation, useRemoveCourseMutation } from '@/features/api/courseApi';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

const CourseTab = () => {

    const [input, setInput] = useState({
        courseTitle: "",
        subTitle: "",
        description: "",
        category: "",
        courseLevel: "",
        coursePrice: "",
        courseThumbnail: ""
    });

    const params = useParams();
    const courseId = params.courseId;
    const { data: courseByIdData, isLoading: courseByIdLoading, refetch } = useGetCourseByIdQuery(courseId);

    const [publishCourse, { }] = usePublishCourseMutation();

    useEffect(() => {
        if (courseByIdData?.course) {
            const course = courseByIdData?.course;
            setInput({
                courseTitle: course.courseTitle,
                subTitle: course.subTitle,
                description: course.description,
                category: course.category,
                courseLevel: course.courseLevel,
                coursePrice: course.coursePrice,
                courseThumbnail: ""
            })


            setPreviewThumbnail(course.courseThumbnail);

        }

    }, [courseByIdData])

    const [previewThumbnail, setPreviewThumbnail] = useState("");

    const navigate = useNavigate();

    const [editCourse, { data, isLoading, isSuccess, error }] = useEditCourseMutation();
    const [removeCourse, { isLoading: isRemoving }] = useRemoveCourseMutation();

    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value })
    }

    const selectCategory = (value) => {
        setInput({ ...input, category: value })
    }

    const selectCourseLevel = (value) => {
        setInput({ ...input, courseLevel: value })
    }

    const selectThumbnail = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setInput({ ...input, courseThumbnail: file });
            const fileReader = new FileReader();
            fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
            fileReader.readAsDataURL(file);
        }
    }

    const updateCourseHandler = async () => {
        const formData = new FormData();
        formData.append("courseTitle", input.courseTitle)
        formData.append("subTitle", input.subTitle)
        formData.append("description", input.description)
        formData.append("category", input.category)
        formData.append("courseLevel", input.courseLevel)
        formData.append("coursePrice", input.coursePrice)
        if (input.courseThumbnail) {
            formData.append("courseThumbnail", input.courseThumbnail);
        }

        await editCourse({ formData, courseId })
    }

    const publishStatusHandler = async (action) => {
        try {

            const response = await publishCourse({ courseId, query: action })
            if (response.data) {
                refetch();
                toast.success(response.data.message)
            }

        } catch (error) {
            toast.error("Failed to publish or unpublish course")
        }
    }

    const removeCourseHandler = async () => {
        try {
            const res = await removeCourse(courseId).unwrap();
            toast.success(res.message || "Course removed successfully");
            navigate("/admin/course");
        } catch (err) {
            toast.error(err.data?.message || "Failed to remove course");
        }
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message || "Course updated")
        }
        if (error) {
            toast.error(error.data.message || "Failed to update the course")
        }
    }, [isSuccess, error])

    if (courseByIdLoading) return <h1>Loading...</h1>


    return (
        <Card>
            <CardHeader className='flex flex-row justify-between'>
                <div>
                    <CardTitle>Manage Your Course Details</CardTitle>
                    <CardDescription>
                        Quickly update your course information and save your changes when you're done.
                    </CardDescription>
                </div>
                <div className='space-x-2'>
                    <Button disabled={courseByIdData?.course.lectures.length === 0} variant='outline' onClick={() => publishStatusHandler(courseByIdData?.course.isPublished ? "false" : "true")}>
                        {courseByIdData?.course.isPublished ? "Unpublish" : "Publish"}
                    </Button>
                    <Button onClick={removeCourseHandler} disabled={isRemoving}>
                        {
                            isRemoving ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Removing...
                                </>
                            ) : "Remove Course"
                        }
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className='space-y-4 mt-5'>
                    <div>
                        <Label>Title</Label>
                        <Input type="text" value={input.courseTitle} onChange={changeEventHandler} name="courseTitle" placeholder="Ex. Fullstack developer" />
                    </div>
                    <div>
                        <Label>Subtitle</Label>
                        <Input type="text" value={input.subTitle} onChange={changeEventHandler} name="subTitle" placeholder="Ex. Become a fullstack developer from Zero to Hero" />
                    </div>
                    <div>
                        <Label>Description</Label>
                        <RichTextEditor />
                    </div>
                    <div className='flex items-center gap-5'>
                        <div>
                            <Label>Category</Label>
                            <Select value={input.category} onValueChange={selectCategory}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Category</SelectLabel>
                                        <SelectItem value="Next JS">Next JS</SelectItem>
                                        <SelectItem value="Data Science">Data Science</SelectItem>
                                        <SelectItem value="Frontend Development">Frontend Development</SelectItem>
                                        <SelectItem value="Fullstack Development">Fullstack Development</SelectItem>
                                        <SelectItem value="MERN Stack Development">MERN Stack Development</SelectItem>
                                        <SelectItem value="Javascript">Javascript</SelectItem>
                                        <SelectItem value="Python">Python</SelectItem>
                                        <SelectItem value="Docker">Docker</SelectItem>
                                        <SelectItem value="MongoDB">MongoDB</SelectItem>
                                        <SelectItem value="HTML">HTML</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Course Level</Label>
                            <Select value={input.courseLevel} onValueChange={selectCourseLevel}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select the course level" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Course Level</SelectLabel>
                                        <SelectItem value="Beginner">Beginner</SelectItem>
                                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                                        <SelectItem value="Advance">Advance</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Price (in INR)</Label>
                            <Input type="number" name="coursePrice" value={input.coursePrice} onChange={changeEventHandler} placeholder="Ex. 499" />
                        </div>
                    </div>
                    <div>
                        <Label>Course Thumbnail</Label>
                        <Input type="file" onChange={selectThumbnail} accept="image/*" className='w-fit' />
                        {
                            previewThumbnail && (
                                <img src={previewThumbnail} className='end-64 my-2' alt="Course Thumbnail" />
                            )
                        }
                    </div>
                    <div>
                        <Button variant="outline" onClick={() => navigate("/admin/course")}>Cancel</Button>
                        <Button disabled={isLoading} onClick={updateCourseHandler}>
                            {
                                isLoading ? (
                                    <>
                                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                        Please wait
                                    </>
                                ) : "Save"
                            }
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default CourseTab