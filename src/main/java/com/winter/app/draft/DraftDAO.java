package com.winter.app.draft;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.winter.app.employee.DepartmentVO;
import com.winter.app.employee.EmployeeVO;



@Mapper
public interface DraftDAO {
	
	List<Map<String, Object>> getBasisDraft() throws Exception;
	List<DepartmentVO> getDepartmentList()throws Exception;
	DraftVO getDraftMaxDocNum()throws Exception;
	Map<String, Object> getEmployeeDetail(EmployeeVO employeeVO) throws Exception;
	List<DepartmentVO> getDepartmentHighList() throws Exception;
	int setApprovalLine(ApprovalLineVO approvalLineVO)throws Exception;
	EmployeeVO getCEO()throws Exception;
	ApprovalLineVO getApprovalMaxNum() throws Exception;

	List<Map<String, Object>> getApprovalList(ApprovalLineVO approvalLineVO) throws Exception;

	
	
}
