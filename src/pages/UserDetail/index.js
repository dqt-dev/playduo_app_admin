import React from 'react'
import './style.css';
import { getAudioDurationInSeconds } from "@remotion/media-utils";
import { AiOutlineInbox } from 'react-icons/ai';
import {getAllSkills, actDisableUserSkill,actEnableUserSkill, getGetUserDetail} from "../../redux/UserDetail/action"

import star from '../../assets/images/star.png'
import coin from '../../assets/images/coin.png'
import stop from '../../assets/images/stop.png'

import play from '../../assets/images/play.png'
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Howl, Howler } from 'howler';

import { BASE_URL } from '../../common/SystemConstant';
import { handleConvertDate } from '../../utils/ultil';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

function UserDetail() {

    const dispatch = useDispatch();
    const {userDetail:user, skills}  = useSelector(state => state.userDetailReducer)
    console.log(user)

    const reviewTemplate = {
        id: null,
        avatarUrl: "",
        nickName: "",
        comment: "",
        rating: 0,
        createdAt: "",
    }

    const { userId } = useParams();

    const [skillId, setSkillId] = useState('');

    const [isPlay, setIsPlay] = useState(0);

    // const [skills, setSkills] = useState([initSkill]);

    const [currentSkill, setCurrentSkill] = useState();

    const [sound, setSound] = useState(null);

    const [duration, setDuration] = useState(0);

    const [reviews, setReviews] = useState([reviewTemplate]);


    const stopSound = () => {
        setIsPlay(0);
        if (sound) sound.stop();
    }

    const myFunction = (data) => getAudioDurationInSeconds(BASE_URL + data?.audioUrl).then((duration) => {
        setDuration(duration)
    });

    const soundPlay = (src, skillId) => {
        Howler.stop();
        const sound = new Howl({ src })
        setSound(sound);
        setIsPlay(skillId)
        sound.play();
        sound.on('end', () => {
            stopSound();
        });

    }

    const changeSkill = skillId => {
        setSkillId(skillId);
        stopSound();
    }

    useEffect(() => {
        if (skills) {
            let temp = skills[0]
            if (temp) {
                setCurrentSkill(temp);
                setSkillId(temp.skillId);
                myFunction(temp)
            }
        }
    }, [skills])


    useEffect(() => {
        if (userId) {
            dispatch(getGetUserDetail(userId))
            // getSkills(userId);
            dispatch(getAllSkills({
                userId: userId,
            }))
        }
    }, [userId]);

    const handleDisable = () => {
        dispatch(actDisableUserSkill(userId, skillId))
    }

    const handleEnable = () => {
        dispatch(actEnableUserSkill(userId, skillId))
    }

    return (
        <>
            <div className='container mt-3' style={{ position: "relative" }}>
                <div className='card main-info'>
                    <div className="mb-3 d-flex" style={{  height: "70px" }}>

                            <div className="ps-4">
                                <img src={BASE_URL + user?.avatarUrl} style={{ width: "72px" , height: "72px", borderRadius: "50%" }} className="mt-2" alt="..." />
                                {user?.status ? <div className="div-online-2" style={{ background: "#31a24c", width: "13px", height: "13px", borderRadius: "50%" }}></div> :
                                    <div className="div-online-2" style={{ background: "red", width: "13px", height: "13px", borderRadius: "50%" }}></div>}
                            </div>
                            <div className="pt-2 ps-3">
                                <div className="text-body">
                                    <p className="card-text text-start mt-2 mb-1 fw-bold">{user?.nickName}</p>
                                    <p className="card-text text-start fw-bold ">ID: {user?.id}</p>
                                </div>
                            </div>

                    </div>
                </div>
                <div className="d-flex bd-highlight mt-3">
                    <div className='card' style={{ height: "800px", borderTopRightRadius: "18px", borderTopLeftRadius: "18px" }}>
                        <div className="flex" style={{ width: "324px" }}>
                            <img src={BASE_URL + user?.avatarUrl} style={{ width: "324px", height: "324px", borderTopRightRadius: "18px", borderTopLeftRadius: "18px" }} className="" alt="..." />
                        </div>
                        <div>
                            <div className="text-body ms-2">
                                <p className="card-text text-start mt-2 mb-1 fw-bold fs-2">Lý lịch</p>
                                <p className="card-text text-start fw-bold">{user?.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className='detail-skill-info ms-3'>
                        <div className="d-flex flex-row" >
                            {skills?.map((skill) => {
                                if (skill.skillId == skillId)
                                    return (
                                        <div onClick={() => {setCurrentSkill(skill); changeSkill(skill.skillId); myFunction(currentSkill?.audioUrl) }} className="text-center me-4 skill-index" key={skill.skillId} style={{ position: "relative", height: "48px", width: "124px" }}>
                                            <div style={{ border: "solid #1890ff", width: "130px", borderRadius: "10px" }}>
                                                <img src={BASE_URL + skill.imageSmallUrl} style={{ height: "48px", width: "124px" }} alt=""/>
                                                <div className='category-name-div fw-bold fs-10px '>{skill?.categoryName}</div>
                                            </div>
                                        </div>
                                    )
                                return (
                                    <div onClick={() => {setCurrentSkill(skill); changeSkill(skill.skillId); myFunction(currentSkill?.audioUrl) }} className="text-center me-4 mt-1 skill-index" key={skill.skillId} style={{ position: "relative", height: "48px", width: "124px" }}>
                                        <img src={BASE_URL + skill.imageSmallUrl} style={{ height: "48px", width: "124px" }}  alt=""/>
                                        <div className='category-name-div fw-bold fs-10px'>{skill?.categoryName}</div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="card skill-info-of-user mt-3">
                            <div className="text-body ms-2">
                                <p className="card-text text-start mt-2 mb-1 fw-bold fs-2">{currentSkill?.categoryName}</p>
                                <p className="d-flex align-items-center mb-1 card-text fw-bold fs-4" >{currentSkill?.price}<img style={{ height: "24px", width: "24px" }} src={coin} alt=""/>/ Trận</p>
                                <p className="d-flex align-items-center mb-2 card-text fw-bold fs-4" >Đánh giá:<img style={{ height: "20px", width: "20px" }} src={star} className="ms-2 me-2" alt=""/> {currentSkill?.rating}  |  Đã phục vụ: {currentSkill?.total}</p>
                               {!currentSkill?.isEnabled ? <button type="button" className="btn btn-lg btn-order ms-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={handleEnable}>Enable</button> :
                                <button type="button"  className="btn btn-lg btn-chat ms-3" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"
                                onClick={handleDisable}
                                >Disable</button> }
                            </div>
                        </div>
                        <div className="card skill-info mt-3">
                            <div className="text-body ms-2">
                                <p className="card-text text-start mt-2 mb-1 fw-bold fs-3">Thông tin game</p>
                                <p className="align-items-center mb-1 card-text fs-5" >{currentSkill?.description}</p>
                                <div className="d-flex flex-row items-center px-4px border rounded-2" style={{ height: "24px", width: "60px" }}>
                                    {isPlay === currentSkill?.skillId ? <img src={stop} alt="stop" className="w-16px h-16px mt-1 ms-1 me-2" onClick={() => stopSound()} /> :
                                        <img src={play} alt="play" className="w-16px h-16px mt-1 ms-1 me-2" onClick={() => soundPlay(BASE_URL + currentSkill?.audioUrl, currentSkill?.skillId)} />}
                                    <div>{Math.ceil(duration)}'</div>
                                </div>
                                <div>
                                    <img className="mt-3" src={BASE_URL + currentSkill?.imageDetailUrl} style={{ height: "190px", width: "338px" }} alt=""/>
                                </div>
                            </div>
                            <div className='pb-3'>
                                <div className="d-flex items-center justify-content-between mt-3">
                                    <div className="text-20px font-bold text-#333333 ms-3">Đánh Giá Của Người Dùng ({reviews.length})</div>
                                    <div className="d-flex me-3">
                                        <img src={star} alt="rating" className="mt-1 w-24px h-24px" />
                                        <div className=" text-20px font-bold text-#333333 ms-1">{currentSkill?.rating}/5</div>
                                    </div>
                                </div>
                                {reviews.length > 0 ? reviews.map((review, index) => {
                                    const starArray = [...Array(review.rating).keys()].map(i => i + 1);
                                    return (
                                        <div key={index} className="d-flex items-center justify-content-between mt-3">
                                            <div className="text-20px font-bold text-#333333 ms-3">
                                                <div className="d-flex">
                                                    <img className="w-44px h-44px rounded-50 mt-1" src={BASE_URL + review.avatarUrl} style={{ height: "44px" }} alt=""/>
                                                    <div className='flex ms-2'>
                                                        <div className="d-flex items-center justify-content-between" style={{ width: "870px" }}>
                                                            <div className=""> {review.nickName}</div>
                                                            <div className='ps-10 flex justify-content-end'>
                                                                {starArray.map(i => <img key={i} src={star} alt="eva" className=""></img>)}
                                                            </div>
                                                        </div>
                                                        <div className="mt-5px text-16px text-#999999">{review.createdAt && handleConvertDate(review.createdAt)}</div>
                                                        <div className="text-16px text-#333333">{review.comment}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }) :
                                    <div>
                                        <div className='d-flex justify-content-center'>
                                            <AiOutlineInbox size={70} />
                                        </div>
                                        <p className='text-center fw-bold'>Chưa có dữ liệu đánh giá</p>
                                    </div>
                                }
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default UserDetail