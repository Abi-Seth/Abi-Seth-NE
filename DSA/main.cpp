#include <iostream>
#include <fstream>
#include <sstream>
#include <algorithm>
#include <vector>
#include <ctime>
#include <regex>
#include <iomanip>
#include <unordered_set>

using namespace std;

struct Item {
    string item_id;
    string item_name;
    string quantity;
    string reg_date;
};

void addDataToFile(string filename, string value) {
    ofstream outfile;
    outfile.open(filename, ios::app);
    outfile << value << endl;
    outfile.close();
}

bool isDuplicateRecordInFile(const string& filename, const string& sub_value, int fieldIndex) {
    ifstream infile(filename);

    unordered_set<string> uniqueValues;
    string line;

    while (getline(infile, line)) {
        istringstream lineStream(line);
        string fieldValue;

        for (int i = 0; i <= fieldIndex; ++i) {
            if (!getline(lineStream, fieldValue, ',')) {
                infile.close();
                return false;
            }
        }

        uniqueValues.insert(fieldValue);

        if (fieldValue == sub_value) {
            infile.close();
            return true;
        }
    }

    infile.close();
    return false;
}

int retrieveNextToCurrentInventoryIndex(string filename) {
    int nextIndex = 0;
    string line;
    ifstream infile;
    infile.open(filename);

    while (getline(infile, line)) {
        nextIndex += 1;
    }
    infile.close();
    return nextIndex++;
}

bool compareAscendingOrder(const Item& a, const Item& b) {
    return a.item_name < b.item_name;
}

void capitalizeFirstLetter(string& str) {
    if (!str.empty()) {
        str[0] = toupper(str[0]);
    }
}

void readDataFromFile(string filename) {
    ifstream infile;
    infile.open(filename);
    string line;
    vector<Item> foundFileContent;

    while (getline(infile, line)) {
        istringstream lineStream(line);
        Item item;
        getline(lineStream, item.item_id, ',');
        getline(lineStream, item.item_name, ',');
        getline(lineStream, item.quantity, ',');
        getline(lineStream, item.reg_date, ',');
        foundFileContent.push_back(item);
    }
    infile.close();

    sort(foundFileContent.begin(), foundFileContent.end(), compareAscendingOrder);

    // Remove duplicate items
    foundFileContent.erase(unique(foundFileContent.begin(), foundFileContent.end(), 
        [](const Item& a, const Item& b) {
            return a.item_id == b.item_id && a.item_name == b.item_name &&
                a.quantity == b.quantity && a.reg_date == b.reg_date;
        }), foundFileContent.end());

    cout << "==================================================================================" <<endl;
    cout << "*                  A L L      I T E M S      A V A I L A B L E                   *" <<endl;
    cout << "==================================================================================" <<endl;
    cout << endl;
    for (Item& item : foundFileContent) {
        capitalizeFirstLetter(item.item_name);
        cout
            << left
            << setw(10) << "Item ID:" << item.item_id << "\t"
            << setw(12) << "Item Name:" << item.item_name << "  \t"
            << setw(10) << "Quantity :" << item.quantity << " \t"
            << setw(10) << "Reg Date :" << item.reg_date << endl;
    }
    if (foundFileContent.empty()) {
        cout << "                             No Items Registered Yet!                             " <<endl;
    }
    cout << endl;
    cout << "==================================================================================" <<endl;
}

string changeStringCase(string str, bool toLower = false) {
    for_each(str.begin(), str.end(), [toLower](char& c) {
        c = toLower ? c = ::tolower(c) : c = ::toupper(c);
    });
    return str;
}

// add item to inventory csv file
void addItem(int item_id, string item_name, int item_quantity, string item_registration_date) {
    string itemData = to_string(item_id).append(",")
        .append(item_name).append(",")
        .append(to_string(item_quantity)).append(",")
        .append(item_registration_date);
    addDataToFile("inventory.csv", itemData);
}

// list all the registered inventory
void listItems() {
    readDataFromFile("inventory.csv");
}

bool isValidDate(const string& dateStr) {
    regex dateRegex(R"(\d{4}-\d{2}-\d{2})");

    return regex_match(dateStr, dateRegex);
}

void printErrors(string error_value) {
    cout << "======================================================================" <<endl;
    cout << "*                   E R R O R      O C C U R E D                     *" <<endl;
    cout << "======================================================================" <<endl;
    cout <<endl;
    cout << "| > " << error_value << endl;
    cout <<endl;
    cout << "======================================================================" <<endl;
}

int userManual() {
    cout << endl << "Need any help? Type 'help' then press Enter key." << endl;

    string command;

    do {
        cout << "Shell >";
        getline(cin, command);

        regex pattern("\\s{2,}");
        string result = regex_replace(command, pattern, " ");
        for_each(command.begin(), command.end(), [](char& c) {
            c = ::tolower(c);
        });

        system("cls"); // ("cls") for windows and linux ("clear")

        string commandCopy = command;
        string spaceDelimiter = " ";
        vector<string> splitCommands{};

        bool inQuotes = false;
        string item;
        for (char c : commandCopy) {
            if (c == '\"') {
                inQuotes = !inQuotes;
                continue;
            }
            if (c == ' ' && !inQuotes) {
                if (!item.empty()) {
                    splitCommands.push_back(item);
                    item.clear();
                }
                continue;
            }
            item += c;
        }

        if (!item.empty()) {
            splitCommands.push_back(item);
        }

        if (
            changeStringCase(splitCommands.at(0), true).compare("itemadd") == 0
        ) {
            if (splitCommands.size() != 5) {
                printErrors("Error: Invalid command entered! Check and Try again");
                continue;
            }
            if (
                isDuplicateRecordInFile("inventory.csv", changeStringCase(splitCommands.at(1)), 0) ||
                isDuplicateRecordInFile("inventory.csv", changeStringCase(splitCommands.at(2)), 1)
            ) {
                string commonErrorSubstr = "Error: Inventory item with";
                string specificDuplicate = isDuplicateRecordInFile(
                    "inventory.csv", changeStringCase(splitCommands.at(1)), 0) ?
                        "ID already exists" : "Name already exists";
                printErrors(commonErrorSubstr.append(" ").append(specificDuplicate));
                continue;
            }
            if (!isValidDate(splitCommands.at(4))) {
                printErrors("Error: You entered an invalid date! Try again.");
                continue;
            }
            addItem(
                stoi(splitCommands.at(1)),
                splitCommands.at(2),
                stoi(splitCommands.at(3)),
                splitCommands.at(4)
            );
            splitCommands.at(2)[0] = toupper(splitCommands.at(2)[0]);
            cout << "==================================================================" << endl;
            cout << "*              I N V E N T O R Y    C R E A T E D                *" << endl;
            cout << "==================================================================" << endl;
            cout << "ITEM ID                       : " << splitCommands.at(1) << endl;
            cout << "ITEM NAME                     : " << splitCommands.at(2) << endl;
            cout << "ITEM QUANTITY                 : " << splitCommands.at(3) << endl;
            cout << "REGISTRATION DATE             : " << splitCommands.at(4) << endl;
            cout << "==================================================================" << endl;
        } else if (
            changeStringCase(splitCommands.at(0), true).compare("itemslist") == 0
        ) {
            listItems();
        } else if (
            changeStringCase(splitCommands.at(0), true).compare("help") == 0
        ) {
            cout << "====================================================================================================" << endl;
            cout << "*                             C O M M A N D S       S Y N T A X E S                                *" << endl;
            cout << "====================================================================================================" << endl;
            cout << "itemadd <item_id> <item_name> <quantity> <registration_date>           : Add a new item" << endl;
            cout << "itemslist                                                              : List all available inventory" << endl;
            cout << "help                                                                   : Prints user manual" << endl;
            cout << "exit                                                                   : Exit the program" << endl;
            cout << "====================================================================================================" << endl;
        } else if (
            changeStringCase(splitCommands.at(0), true).compare("exit") == 0
        ) {
            return 0;
        } else {
            printErrors("You have entered an INVALID COMMAND!");
        }

    } while (command.compare("exit") != 0);
    return 0;
}

int main() {
    cout << endl << endl;
    cout << "===========================================================================================" << endl;
    cout << "*                       R C A     I N V E N T O R Y     S Y S T E M                       *" << endl;
    cout << "-------------------------------------------------------------------------------------------" << endl;
    cout << "                                                                                           " << endl;
    cout << "             Developed by ABIJURU SETH as End of Year 3 2023 DSA National Exam             " << endl;
    cout << "                                                                                           " << endl;
    cout << "===========================================================================================" << endl;

    userManual();

    cout << "===========================================================================================" << endl;
    cout << "*                           P R O G R A M    S H U T    D O W N                           *" << endl;
    cout << "===========================================================================================" << endl;
    cout << endl;
    cout << "*                                       Bye For Now!                                      *" << endl;
    cout << endl;
    cout << "===========================================================================================" << endl;

    return 0;
}