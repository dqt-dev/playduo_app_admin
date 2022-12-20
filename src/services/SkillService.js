import http from "./http-common";
const getAll = data => {
    return http.post("Skills", data);
  };
  const getSkillById = skillId => {
    return http.get(`Skills/${skillId}`);
  };
  const disableUserSkill = skillId => {
    return http.put(`/Skills/${skillId}/disable`, {});
  };
  const acceptUserSkill = skillId => {
    return http.put(`/Skills/${skillId}/accept`, {});
  };
  const enableUserSkill = skillId => {
    return http.put(`/Skills/${skillId}/enable`, {});
  };
  const getSkillTemp = () => {
    return http.get("Skills/skill-temp");
  };
const SkillService = {
  getAll,
  getSkillById,
  disableUserSkill,
  enableUserSkill,
  acceptUserSkill,
  getSkillTemp
};
export default SkillService;