const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Location of the Excel file
const dataDir = path.join(__dirname, '..', 'data');
const excelFilePath = path.join(dataDir, 'matrimony_registrations.xlsx');
// Also write to project root so the user can open it directly in Windows File Explorer
const rootExcelFilePath = path.join(__dirname, '..', '..', 'matrimony_registrations.xlsx');

/**
 * Format a user record into an Excel row object
 */
function mapUserToExcelRow(user) {
  const p = user.profile || {};
  return {
    'Registration Date': user.created_at ? new Date(user.created_at).toLocaleString() : new Date().toLocaleString(),
    'User ID': user.id || '',
    'Full Name': user.name || '',
    'Gender': user.gender || p.gender || '',
    'Profile Created By': p.profileCreatedBy || '',
    'Age / Date of Birth': p.dobOrAge || '',
    'Marital Status': p.maritalStatus || '',
    'Mobile Number': user.phone || '',
    'Email Address': (user.email && !user.email.includes('@salafimatch.local')) ? user.email : 'Not provided',
    'Country': p.country || '',
    'Current Location / City': p.currentLocation || '',
    'Native Place / District': p.nativePlace || '',
    'Manhaj / Religious Approach': p.manhaj || '',
    'Prayer Practice': p.prayerPractice || '',
    'Religious Education': p.religiousEducation || '',
    'Hijab / Beard Preference': p.hijabOrBeardPreference || '',
    'Education Qualification': p.educationQualification || '',
    'Occupation': p.occupation || '',
    'Monthly Income Range': p.monthlyIncome || 'Not disclosed',
    'Height': p.height || '',
    'Languages Known': p.languagesKnown || '',
    'Personal Bio': p.bio || '',
    "Father's Occupation": p.fatherOccupation || '',
    "Mother's Occupation": p.motherOccupation || '',
    'Number of Siblings': p.siblingsCount || '',
    'Family Location': p.familyLocation || '',
    'Family Background': p.familyBackground || '',
    'Guardian (Wali) Contact': p.guardianContact || '',
    'Partner Preferred Age': p.preferredAgeRange || '',
    'Partner Preferred Location': p.preferredLocation || '',
    'Partner Preferred Marital Status': p.preferredMaritalStatus || '',
    'Partner Preferred Education': p.preferredEducation || '',
    'Partner Religious Compatibility': p.religiousCompatibility || '',
    'Partner Preferred Height': p.preferredHeight || '',
    'Willingness to Relocate': p.willingnessToRelocate || '',
    'Other Partner Expectations': p.otherExpectations || ''
  };
}

/**
 * Write a list of users to the Excel spreadsheet
 */
function writeUsersToExcel(usersList) {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const rows = usersList.map(mapUserToExcelRow);
    const worksheet = XLSX.utils.json_to_sheet(rows);

    // Auto-fit column widths
    const columnKeys = Object.keys(rows[0] || {});
    worksheet['!cols'] = columnKeys.map((key) => {
      let maxLen = key.length;
      rows.forEach((row) => {
        const val = row[key] ? String(row[key]) : '';
        if (val.length > maxLen) maxLen = Math.min(val.length, 45);
      });
      return { wch: maxLen + 3 };
    });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Registrations');

    // Save to data directory
    XLSX.writeFile(workbook, excelFilePath);
    // Also save to root folder for quick user access
    XLSX.writeFile(workbook, rootExcelFilePath);

    console.log(`[Excel] Successfully saved ${usersList.length} registration(s) to Excel sheet.`);
    return true;
  } catch (err) {
    console.error('[Excel Error] Failed to write to Excel file:', err.message);
    return false;
  }
}

/**
 * Append or update a single user in the Excel file
 */
function appendUserToExcel(newUser, allUsers = null) {
  try {
    let users = allUsers;
    if (!users) {
      const dbModule = require('../db');
      const localDb = dbModule.getLocalDb();
      users = localDb.users || [];
    }

    // Check if new user is already in the list
    const exists = users.some((u) => u.id === newUser.id);
    if (!exists) {
      users = [...users, newUser];
    }

    return writeUsersToExcel(users);
  } catch (err) {
    console.error('[Excel Error] appendUserToExcel:', err.message);
    return false;
  }
}

module.exports = {
  mapUserToExcelRow,
  writeUsersToExcel,
  appendUserToExcel,
  getExcelFilePath: () => excelFilePath,
  getRootExcelFilePath: () => rootExcelFilePath
};

