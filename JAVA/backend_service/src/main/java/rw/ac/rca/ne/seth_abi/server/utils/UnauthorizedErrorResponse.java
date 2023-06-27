package rw.ac.rca.ne.seth_abi.server.utils;

public class UnauthorizedErrorResponse {
    private int status;
    private String message;

    public UnauthorizedErrorResponse(int status, String message) {
        this.status = status;
        this.message = message;
    }

    public int getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }
}
